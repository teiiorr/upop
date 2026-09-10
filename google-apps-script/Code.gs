/**
 * UPOP_casting — Google Sheet backend for the U POP TREND application form.
 *
 * Receives one application per POST from the website and appends it as a
 * neatly formatted row.
 *
 *  • Concurrency  — every write is wrapped in a script lock, so simultaneous
 *                   submissions can never overwrite or interleave rows.
 *  • Idempotency  — each application carries a `submissionId`; a row with that
 *                   id is never appended twice (retry / double-submit safe).
 *  • Nice format  — a frozen, gold, bold, centered header; readable titles;
 *                   real date-times; Ha/— for yes-no fields; row banding that
 *                   starts BELOW the header (so it never greys the header).
 *
 * Setup lives in SETUP.md. After editing this file, redeploy:
 * Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: New version ▸ Deploy.
 */

var SHEET_NAME = 'Applications';
var ID_COL = 2;                 // "Submission ID" column — used for dedupe/purge

/* The admin password is NOT stored in this file (the repo may be public and
   the sheet holds minors' personal data). Set it once in
   Project Settings ▸ Script properties ▸ add property  ADMIN_KEY = <password>.
   It guards both the maintenance actions and the read/list feed. */
function adminKey() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_KEY') || '';
}
function authorized(data) {
  var k = adminKey();
  return k !== '' && String(data && data.key) === k;
}

/* Column order + human titles. Keys match the JSON the site sends.
   `type:'bool'` → Ha/—, `type:'datetime'` → real date. `wide:true` widens
   the column for long free-text; `center:true` centre-aligns short values. */
var FIELDS = [
  { k: 'submittedAt',       h: 'Vaqt / Timestamp',            type: 'datetime', center: true },
  { k: 'submissionId',      h: 'Submission ID' },
  { k: 'lang',              h: 'Til',                          center: true },

  { k: 'fullname',          h: 'F.I.Sh. / To‘liq ism' },
  { k: 'birthdate',         h: 'Tug‘ilgan sana',               center: true },
  { k: 'age',               h: 'Yosh',                         center: true },
  { k: 'gender',            h: 'Jins',                         center: true },
  { k: 'citizenship',       h: 'Fuqarolik',                    center: true },
  { k: 'region',            h: 'Yashash shahri / tumani' },
  { k: 'phone',             h: 'Telefon',                      center: true },
  { k: 'email',             h: 'E-mail' },
  { k: 'instagram',         h: 'Instagram' },
  { k: 'tiktok',            h: 'TikTok' },
  { k: 'telegram',          h: 'Telegram' },
  { k: 'youtube',           h: 'YouTube' },

  { k: 'parent_name',       h: 'Ota-ona / vakil F.I.Sh.' },
  { k: 'parent_relation',   h: 'Ishtirokchiga kim',            center: true },
  { k: 'parent_phone',      h: 'Ota-ona telefon',              center: true },
  { k: 'parent_email',      h: 'Ota-ona e-mail' },
  { k: 'parent_consent',    h: 'Ota-ona roziligi',             type: 'bool' },

  { k: 'rule_agree',        h: 'Ijro qoidasiga rozilik',       type: 'bool' },
  { k: 'piece',             h: 'Ijro asari (nomi, muallifi)',  wide: true },
  { k: 'genre',             h: 'Janr / yo‘nalish',             center: true },
  { k: 'education',         h: 'Musiqiy ta’lim',               wide: true },
  { k: 'instruments',       h: 'Cholg‘u asboblari' },
  { k: 'years_singing',     h: 'Necha yildan beri kuylaydi',   center: true },
  { k: 'vocal_teacher',     h: 'Vokal ustoz' },
  { k: 'contests',          h: 'Tanlov / shou tajribasi',      wide: true },
  { k: 'video',             h: 'Ijro video havolasi',          wide: true },

  { k: 'why',               h: 'Nega ishtirok etmoqchi',       wide: true },
  { k: 'music_means',       h: 'Musiqa nima degani',           wide: true },
  { k: 'three_words',       h: 'Uch so‘z bilan o‘zi' },
  { k: 'idol',              h: 'Kumir / ilhomlantiruvchi' },
  { k: 'hobbies',           h: 'Qiziqishlar',                  wide: true },
  { k: 'free_time',         h: 'Bo‘sh vaqt mashg‘uloti' },
  { k: 'father_name',       h: 'Ota F.I.Sh.' },
  { k: 'father_job',        h: 'Ota ish joyi' },
  { k: 'mother_name',       h: 'Ona F.I.Sh.' },
  { k: 'mother_job',        h: 'Ona ish joyi' },
  { k: 'siblings',          h: 'Aka-uka / opa-singil',         wide: true },
  { k: 'live_with',         h: 'Kim bilan yashaydi' },
  { k: 'support',           h: 'Kim qo‘llab-quvvatlaydi',      wide: true },

  { k: 'chronic',           h: 'Surunkali kasalliklar' },
  { k: 'allergy',           h: 'Allergiya' },
  { k: 'emergency_contact', h: 'Favqulodda kontakt',           wide: true },

  { k: 'log_attend',        h: 'Shaxsan boradi',               type: 'bool' },
  { k: 'log_stages',        h: 'Keyingi bosqichlarga tayyor',  type: 'bool' },
  { k: 'log_travel',        h: 'Boshqa shaharlarga tayyor',    type: 'bool' },

  { k: 'consent_data',      h: 'Ma’lumot qayta ishlash roziligi', type: 'bool' },
  { k: 'consent_media',     h: 'Media foydalanish roziligi',      type: 'bool' },
  { k: 'consent_rules',     h: 'Qoidalarga rozilik',              type: 'bool' },
  { k: 'consent_true',      h: 'Ma’lumotlar haqqoniyligi',        type: 'bool' }
];

/* Admin-only review status, kept in one extra column after all fields, so it
   is shared across everyone who opens the admin panel. Three colours:
   green / yellow / red (meaning is up to the reviewers); empty = not reviewed.
   Stored as a coloured dot so the sheet itself stays readable. */
var STATUS_HEADER = 'Ko‘rib chiqildi / Рассмотрено';
var STATUS_MAP = { green: '🟢', yellow: '🟡', red: '🔴' };
var STATUS_REV = { '🟢': 'green', '🟡': 'yellow', '🔴': 'red' };

/* ---------------------------------------------------------------- POST */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return json({ ok: false, error: 'locked' });
  }

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var ss = SpreadsheetApp.getActive();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeaders(sheet);

    // Read feed for the admin panel — keyed, returns every application.
    if (data && data.action === 'list') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      return json({
        ok: true,
        fields: FIELDS.map(function (f) { return { k: f.k, h: f.h, type: f.type || 'text' }; }),
        rows: readAllRows(sheet)
      });
    }

    // Set the review status (green/yellow/red or '' to clear) — keyed.
    if (data && data.action === 'setStatus') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      var sid = String(data.submissionId || '').trim();
      if (!sid) return json({ ok: false, error: 'no id' });
      var status = String(data.status || '');
      var dot = STATUS_MAP[status] || '';   // unknown/empty clears the cell
      var lr = sheet.getLastRow();
      if (lr > 1) {
        var idvals = sheet.getRange(2, ID_COL, lr - 1, 1).getValues();
        for (var j = 0; j < idvals.length; j++) {
          if (String(idvals[j][0]).trim() === sid) {
            var scell = sheet.getRange(j + 2, FIELDS.length + 1);
            scell.setNumberFormat('@');
            scell.setValue(dot);
            return json({ ok: true, submissionId: sid, status: dot ? status : '', row: j + 2 });
          }
        }
      }
      return json({ ok: false, error: 'not found' });
    }

    // Maintenance action (purge test rows / repair / re-style) — keyed.
    if (data && data.action === 'admin') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      var res = {};
      if (data.purgeTests) res.purged = purgeTestRows(sheet);
      if (data.repair) res.repaired = repairFormulas(sheet);
      if (data.restyle) { styleHeader(sheet); restyleData(sheet); res.restyled = true; }
      return json({ ok: true, admin: true, result: res });
    }

    // Idempotency: bail out if this submissionId is already recorded.
    var subId = String(data.submissionId || '').trim();
    if (subId) {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var ids = sheet.getRange(2, ID_COL, lastRow - 1, 1).getValues();
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]).trim() === subId) {
            return json({ ok: true, duplicate: true, row: i + 2 });
          }
        }
      }
    }

    var row = FIELDS.map(function (f) { return cellValue(f, data[f.k]); });
    var targetRow = sheet.getLastRow() + 1;
    var rowRange = sheet.getRange(targetRow, 1, 1, FIELDS.length);
    // Format the cells BEFORE writing: text ('@') for everything except the
    // timestamp. This stops Sheets from reading "+998…" as a formula (#ERROR!)
    // or mangling long/leading-zero numbers — for every row, any position.
    rowRange.setNumberFormats([FIELDS.map(function (f) {
      return f.type === 'datetime' ? 'yyyy-mm-dd hh:mm:ss' : '@';
    })]);
    rowRange.setValues([row]);
    rowRange
      .setVerticalAlignment('middle')
      .setWrap(true)
      .setHorizontalAlignments([FIELDS.map(function (f) {
        return (f.center || f.type === 'bool') ? 'center' : 'left';
      })]);

    return json({ ok: true, duplicate: false, row: targetRow });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------------------------------------------------------------- GET (health) */
function doGet() {
  return json({ ok: true, service: 'UPOP_casting', time: new Date() });
}

/* ---------------------------------------------------------------- values */
function cellValue(f, v) {
  if (f.type === 'bool') return v === true || v === 'true' ? 'Ha' : '—';
  if (f.type === 'datetime') {
    var d = v ? new Date(v) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }
  if (v === undefined || v === null) return '';
  return String(v);
}

/* ---------------------------------------------------------------- headers */
function ensureHeaders(sheet) {
  var headers = FIELDS.map(function (f) { return f.h; }).concat([STATUS_HEADER]);
  var need = false;
  if (sheet.getLastRow() === 0 || sheet.getMaxColumns() < headers.length) {
    need = true;
  } else {
    var first = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    for (var i = 0; i < headers.length; i++) {
      if (String(first[i]) !== headers[i]) { need = true; break; }
    }
  }
  if (need) styleHeader(sheet);
}

/* Writes + styles the header row and per-column layout. Safe to call again. */
function styleHeader(sheet) {
  var headers = FIELDS.map(function (f) { return f.h; }).concat([STATUS_HEADER]);
  var total = headers.length; // FIELDS.length + 1 (status)

  // Grow a blank 26-column tab so all fields fit before any range op.
  if (sheet.getMaxColumns() < total) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), total - sheet.getMaxColumns());
  }

  var header = sheet.getRange(1, 1, 1, total);
  header.setValues([headers]);
  header
    .setFontSize(12)                 // bigger than the default 10
    .setFontWeight('bold')
    .setFontColor('#241704')         // dark, on gold
    .setBackground('#D3A63F')        // brand gold — no more grey
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 52);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  // Column widths + per-column horizontal alignment for the data area.
  var maxRows = sheet.getMaxRows();
  for (var c = 0; c < FIELDS.length; c++) {
    var f = FIELDS[c];
    var w = f.type === 'bool' ? 120 : (f.wide ? 320 : 180);
    if (f.k === 'submissionId') w = 260;
    sheet.setColumnWidth(c + 1, w);
    if (maxRows >= 2) {
      var colData = sheet.getRange(2, c + 1, maxRows - 1, 1);
      colData.setHorizontalAlignment(f.center || f.type === 'bool' ? 'center' : 'left');
      colData.setVerticalAlignment('middle');
    }
  }
  // review-status column (last): width + centred
  sheet.setColumnWidth(total, 160);
  if (maxRows >= 2) {
    sheet.getRange(2, total, maxRows - 1, 1)
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
  }

  // Row banding for the DATA only (row 2 down) — never touches the header,
  // which is what used to paint it grey.
  try {
    var bandings = sheet.getBandings();
    for (var b = 0; b < bandings.length; b++) bandings[b].remove();
    if (maxRows >= 2) {
      sheet.getRange(2, 1, maxRows - 1, total)
        .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
    }
  } catch (err) { /* banding is cosmetic */ }
}

/* Every application as an array of objects keyed by field, newest first. */
function readAllRows(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return [];
  var n = FIELDS.length;
  var cols = Math.min(n + 1, sheet.getMaxColumns()); // +1 = review status
  var values = sheet.getRange(2, 1, last - 1, cols).getValues();
  var out = [];
  for (var r = 0; r < values.length; r++) {
    var obj = { _row: r + 2 };
    for (var c = 0; c < n; c++) {
      var v = values[r][c];
      if (v instanceof Date) v = v.toISOString();
      obj[FIELDS[c].k] = v;
    }
    var raw = cols > n ? String(values[r][n]).trim() : '';
    obj.status = STATUS_REV[raw] || '';   // green/yellow/red or ''
    obj.reviewed = raw !== '';
    out.push(obj);
  }
  out.reverse(); // newest first
  return out;
}

/* Recover cells that Sheets already turned into a formula (e.g. "+998…" ->
   #ERROR!): read the formula, drop the leading "=", re-store it as text. */
function repairFormulas(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var n = FIELDS.length;
  var formulas = sheet.getRange(2, 1, last - 1, n).getFormulas();
  var fixed = 0;
  for (var r = 0; r < formulas.length; r++) {
    for (var c = 0; c < n; c++) {
      var fla = formulas[r][c];
      if (fla && fla.charAt(0) === '=') {
        var cell = sheet.getRange(r + 2, c + 1);
        cell.setNumberFormat('@');
        cell.setValue(fla.substring(1)); // "=+998…" -> "+998…" as plain text
        fixed++;
      }
    }
  }
  return fixed;
}

/* Re-apply vertical centering + timestamp format to all existing data rows. */
function restyleData(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return;
  var range = sheet.getRange(2, 1, last - 1, FIELDS.length);
  range.setVerticalAlignment('middle').setWrap(true);
  sheet.getRange(2, 1, last - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

/* Delete every row whose Submission ID starts with "TEST-" (bottom-up). */
function purgeTestRows(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var ids = sheet.getRange(2, ID_COL, last - 1, 1).getValues();
  var deleted = 0;
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]).indexOf('TEST-') === 0) {
      sheet.deleteRow(i + 2);
      deleted++;
    }
  }
  return deleted;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
