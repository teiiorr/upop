/**
 * UPOP_casting — Google Sheet backend for the U POP TREND application form.
 *
 * Receives one application per POST from the website and appends it as a
 * neatly formatted row.
 *
 *  • Concurrency  — every write is wrapped in a script lock, so simultaneous
 *                   submissions can never overwrite or interleave rows.
 *  • Idempotency  — each application carries a `submissionId`; if a row with
 *                   that id already exists the script does NOT append again,
 *                   so a retry / double-submit / flaky network is harmless.
 *  • Nice format  — a frozen, styled header row, human-readable column
 *                   titles, real date-times, Ha/— for yes-no fields, wrapped
 *                   text and row banding.
 *
 * Setup lives in SETUP.md (bind this to a sheet named UPOP_casting, then
 * Deploy ▸ New deployment ▸ Web app ▸ Execute as "Me", access "Anyone").
 */

var SHEET_NAME = 'Applications';

/* Column order + human titles. Keys match the JSON the site sends.
   Add/rename here and the header row re-syncs on the next submission. */
var FIELDS = [
  { k: 'submittedAt',       h: 'Vaqt / Timestamp',            type: 'datetime' },
  { k: 'submissionId',      h: 'Submission ID' },
  { k: 'lang',              h: 'Til' },

  { k: 'fullname',          h: 'F.I.Sh. / To‘liq ism' },
  { k: 'birthdate',         h: 'Tug‘ilgan sana' },
  { k: 'age',               h: 'Yosh' },
  { k: 'gender',            h: 'Jins' },
  { k: 'citizenship',       h: 'Fuqarolik' },
  { k: 'region',            h: 'Yashash shahri / tumani' },
  { k: 'phone',             h: 'Telefon' },
  { k: 'email',             h: 'E-mail' },
  { k: 'instagram',         h: 'Instagram' },
  { k: 'tiktok',            h: 'TikTok' },
  { k: 'telegram',          h: 'Telegram' },
  { k: 'youtube',           h: 'YouTube' },

  { k: 'parent_name',       h: 'Ota-ona / vakil F.I.Sh.' },
  { k: 'parent_relation',   h: 'Ishtirokchiga kim' },
  { k: 'parent_phone',      h: 'Ota-ona telefon' },
  { k: 'parent_email',      h: 'Ota-ona e-mail' },
  { k: 'parent_consent',    h: 'Ota-ona roziligi',            type: 'bool' },

  { k: 'rule_agree',        h: 'Ijro qoidasiga rozilik',      type: 'bool' },
  { k: 'piece',             h: 'Ijro asari (nomi, muallifi)' },
  { k: 'genre',             h: 'Janr / yo‘nalish' },
  { k: 'education',         h: 'Musiqiy ta’lim' },
  { k: 'instruments',       h: 'Cholg‘u asboblari' },
  { k: 'years_singing',     h: 'Necha yildan beri kuylaydi' },
  { k: 'vocal_teacher',     h: 'Vokal ustoz' },
  { k: 'contests',          h: 'Tanlov / shou tajribasi' },
  { k: 'video',             h: 'Ijro video havolasi' },

  { k: 'why',               h: 'Nega ishtirok etmoqchi' },
  { k: 'music_means',       h: 'Musiqa nima degani' },
  { k: 'three_words',       h: 'Uch so‘z bilan o‘zi' },
  { k: 'idol',              h: 'Kumir / ilhomlantiruvchi' },
  { k: 'hobbies',           h: 'Qiziqishlar' },
  { k: 'free_time',         h: 'Bo‘sh vaqt mashg‘uloti' },
  { k: 'father_name',       h: 'Ota F.I.Sh.' },
  { k: 'father_job',        h: 'Ota ish joyi' },
  { k: 'mother_name',       h: 'Ona F.I.Sh.' },
  { k: 'mother_job',        h: 'Ona ish joyi' },
  { k: 'siblings',          h: 'Aka-uka / opa-singil' },
  { k: 'live_with',         h: 'Kim bilan yashaydi' },
  { k: 'support',           h: 'Kim qo‘llab-quvvatlaydi' },

  { k: 'chronic',           h: 'Surunkali kasalliklar' },
  { k: 'allergy',           h: 'Allergiya' },
  { k: 'emergency_contact', h: 'Favqulodda kontakt' },

  { k: 'log_attend',        h: 'Shaxsan boradi',              type: 'bool' },
  { k: 'log_stages',        h: 'Keyingi bosqichlarga tayyor', type: 'bool' },
  { k: 'log_travel',        h: 'Boshqa shaharlarga tayyor',   type: 'bool' },

  { k: 'consent_data',      h: 'Ma’lumot qayta ishlash roziligi', type: 'bool' },
  { k: 'consent_media',     h: 'Media foydalanish roziligi',      type: 'bool' },
  { k: 'consent_rules',     h: 'Qoidalarga rozilik',              type: 'bool' },
  { k: 'consent_true',      h: 'Ma’lumotlar haqqoniyligi',        type: 'bool' }
];

var ID_COL = 2; // "Submission ID" is the 2nd column — used for dedupe.

/* ---------------------------------------------------------------- POST */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // serialize with any other in-flight submission
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
    sheet.appendRow(row);
    styleRow(sheet, sheet.getLastRow());

    return json({ ok: true, duplicate: false, row: sheet.getLastRow() });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------------------------------------------------------------- GET (health check) */
function doGet() {
  return json({ ok: true, service: 'UPOP_casting', time: new Date() });
}

/* ---------------------------------------------------------------- helpers */
function cellValue(f, v) {
  if (f.type === 'bool') return v === true || v === 'true' ? 'Ha' : '—';
  if (f.type === 'datetime') {
    var d = v ? new Date(v) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }
  if (v === undefined || v === null) return '';
  return String(v);
}

function ensureHeaders(sheet) {
  var headers = FIELDS.map(function (f) { return f.h; });
  var need = false;
  if (sheet.getLastRow() === 0) {
    need = true;
  } else {
    var first = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    for (var i = 0; i < headers.length; i++) {
      if (String(first[i]) !== headers[i]) { need = true; break; }
    }
  }
  if (!need) return;

  var range = sheet.getRange(1, 1, 1, headers.length);
  range.setValues([headers]);
  range
    .setFontColor('#F4E1A0')
    .setFontWeight('bold')
    .setBackground('#0B1B24')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  // Reasonable widths: wide for long free-text answers, tight for flags.
  for (var c = 0; c < FIELDS.length; c++) {
    var f = FIELDS[c];
    var w = f.type === 'bool' ? 90 : 180;
    if (f.k === 'submissionId') w = 250;
    if (['piece','why','music_means','contests','support','siblings','education','emergency_contact','video'].indexOf(f.k) >= 0) w = 320;
    sheet.setColumnWidth(c + 1, w);
  }

  applyBanding(sheet, headers.length);
}

function styleRow(sheet, rowIndex) {
  var last = FIELDS.length;
  var range = sheet.getRange(rowIndex, 1, 1, last);
  range.setVerticalAlignment('top').setWrap(true);
  // Timestamp column as a real date-time.
  sheet.getRange(rowIndex, 1, 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

function applyBanding(sheet, cols) {
  try {
    var existing = sheet.getBandings();
    for (var i = 0; i < existing.length; i++) existing[i].remove();
    sheet.getRange(1, 1, sheet.getMaxRows(), cols)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  } catch (err) { /* banding is cosmetic — ignore if unsupported */ }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
