/**
 * UPOP_casting — U POP TREND anketasi uchun Google Sheets backend.
 * Saytdan kelgan har bir ariza POST orqali qabul qilinib, jadvalga alohida
 * qator sifatida yoziladi.
 *
 *  • Bir vaqtda kelgan arizalar qulf (LockService) orqali navbatga qoʻyiladi.
 *  • Har arizaning oʻz submissionId qiymati bor — qayta yuborilsa ham ikki
 *    marta yozilmaydi.
 *  • Sarlavha qatori muzlatilgan va oltin rangda; sana-vaqt haqiqiy formatda,
 *    ha/yoʻq maydonlari Ha/— koʻrinishida; qatorlar navbatma-navbat boʻyaladi.
 *
 * Oʻrnatish — SETUP.md. Faylni oʻzgartirgach qayta joylang:
 * Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: New version ▸ Deploy.
 *
 * teiior
 */

var SHEET_NAME = 'Applications';
var ID_COL = 2;                 // "Submission ID" ustuni — takrorlarni aniqlash va tozalash uchun

/* Admin paroli bu faylda saqlanmaydi (repo ochiq boʻlishi mumkin, jadvalda esa
   voyaga yetmaganlarning maʼlumotlari bor). Uni bir marta Project Settings ▸
   Script properties boʻlimida ADMIN_KEY = <parol> koʻrinishida kiriting.
   Parol xizmat amallarini ham, roʻyxatni oʻqishni ham himoya qiladi. */
function adminKey() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_KEY') || '';
}
function authorized(data) {
  var k = adminKey();
  return k !== '' && String(data && data.key) === k;
}

/* Ustunlar tartibi va sarlavhalari. Kalitlar sayt yuboradigan JSON bilan bir xil.
   type:'bool' → Ha/—, type:'datetime' → haqiqiy sana. wide — uzun matn uchun
   keng ustun, center — qisqa qiymatlarni markazga tekislash. */
var FIELDS = [
  { k: 'submittedAt',       h: 'Vaqt / Timestamp',            type: 'datetime', center: true },
  { k: 'submissionId',      h: 'Submission ID' },
  { k: 'lang',              h: 'Til',                          center: true },

  { k: 'fullname',          h: 'F.I.Sh. / Toʻliq ism' },
  { k: 'birthdate',         h: 'Tugʻilgan sana',               center: true },
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
  { k: 'genre',             h: 'Janr / yoʻnalish',             center: true },
  { k: 'education',         h: 'Musiqiy taʼlim',               wide: true },
  { k: 'instruments',       h: 'Cholgʻu asboblari' },
  { k: 'years_singing',     h: 'Necha yildan beri kuylaydi',   center: true },
  { k: 'vocal_teacher',     h: 'Vokal ustoz' },
  { k: 'contests',          h: 'Tanlov / shou tajribasi',      wide: true },
  { k: 'video',             h: 'Ijro video havolasi',          wide: true },

  { k: 'why',               h: 'Nega ishtirok etmoqchi',       wide: true },
  { k: 'music_means',       h: 'Musiqa nima degani',           wide: true },
  { k: 'three_words',       h: 'Uch soʻz bilan oʻzi' },
  { k: 'idol',              h: 'Kumir / ilhomlantiruvchi' },
  { k: 'hobbies',           h: 'Qiziqishlar',                  wide: true },
  { k: 'free_time',         h: 'Boʻsh vaqt mashgʻuloti' },
  { k: 'father_name',       h: 'Ota F.I.Sh.' },
  { k: 'father_job',        h: 'Ota ish joyi' },
  { k: 'mother_name',       h: 'Ona F.I.Sh.' },
  { k: 'mother_job',        h: 'Ona ish joyi' },
  { k: 'siblings',          h: 'Aka-uka / opa-singil',         wide: true },
  { k: 'live_with',         h: 'Kim bilan yashaydi' },
  { k: 'support',           h: 'Kim qoʻllab-quvvatlaydi',      wide: true },

  { k: 'chronic',           h: 'Surunkali kasalliklar' },
  { k: 'allergy',           h: 'Allergiya' },
  { k: 'emergency_contact', h: 'Favqulodda kontakt',           wide: true },

  { k: 'log_attend',        h: 'Shaxsan boradi',               type: 'bool' },
  { k: 'log_stages',        h: 'Keyingi bosqichlarga tayyor',  type: 'bool' },
  { k: 'log_travel',        h: 'Boshqa shaharlarga tayyor',    type: 'bool' },

  { k: 'consent_data',      h: 'Maʼlumot qayta ishlash roziligi', type: 'bool' },
  { k: 'consent_media',     h: 'Media foydalanish roziligi',      type: 'bool' },
  { k: 'consent_rules',     h: 'Qoidalarga rozilik',              type: 'bool' },
  { k: 'consent_true',      h: 'Maʼlumotlar haqqoniyligi',        type: 'bool' }
];

/* Baholash holati — barcha maydonlardan keyingi alohida ustun, admin panelni
   ochgan har bir kishi uchun umumiy. Uch rang: yashil / sariq / qizil (maʼnosini
   baholovchilar belgilaydi); boʻsh — hali koʻrilmagan. Jadval oʻqilishi oson
   boʻlsin deb rangli nuqta sifatida saqlanadi. */
var STATUS_HEADER = 'Koʻrib chiqildi / Рассмотрено';
var STATUS_MAP = { green: '🟢', yellow: '🟡', red: '🔴' };
var STATUS_REV = { '🟢': 'green', '🟡': 'yellow', '🔴': 'red' };

/* Baholovchilarning har bir ishtirokchi haqidagi erkin izohlari. Uzun boʻlsa ham
   mayli — ustun kengayib, matn oʻraladi. Holat ustunidan keyin turadi, shuning
   uchun bitta "review" yozuvi rang bilan izohni birga saqlaydi. */
var HISTORY_HEADER = 'Ishtirokchi tarixi / История участника';

/* Nomzod surati. Sayt (va admin) base64 rasm yuboradi; uni Drive papkasiga
   saqlab, havola orqali koʻrishga ochamiz va shu ustunda URL ni saqlaymiz.
   Rasm emas, URL saqlanadi — jadval ham, admin roʻyxati ham yengil qoladi. */
var PHOTO_HEADER = 'Foto / Фото';
var PHOTO_FOLDER = 'UPOP_casting_photos';

/* ---------------------------------------------------------------- POST */
function doPost(e) {
  // Tanani oldindan oʻqiymiz — faqat oʻqiydigan amallar yozish qulfini kutmasin.
  var data = {};
  try {
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    return json({ ok: false, error: 'bad json' });
  }

  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Admin paneli uchun roʻyxat — faqat oʻqish: qulf ham, sarlavha qayta yozish ham yoʻq.
  // Shunda roʻyxat surat yuklash yoki holat yozish tugashini kutib qolmaydi. Parol bilan.
  if (data && data.action === 'list') {
    if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
    return json({
      ok: true,
      sheetUrl: ss.getUrl(),          // admin ishtirokchi qatoriga toʻgʻridan-toʻgʻri oʻta olishi uchun
      gid: String(sheet.getSheetId()),
      fields: FIELDS.map(function (f) { return { k: f.k, h: f.h, type: f.type || 'text' }; }),
      rows: readAllRows(sheet)
    });
  }

  // Bundan keyingi amallar jadvalni oʻzgartiradi — yozish qulfini olamiz.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return json({ ok: false, error: 'locked' });
  }

  try {
    ensureHeaders(sheet);

    // Baho holatini oʻrnatish (green/yellow/red yoki '' — tozalash). Parol bilan.
    if (data && data.action === 'setStatus') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      var sid = String(data.submissionId || '').trim();
      if (!sid) return json({ ok: false, error: 'no id' });
      var status = String(data.status || '');
      var dot = STATUS_MAP[status] || '';   // nomaʼlum/boʻsh qiymat katakni tozalaydi
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

    // Bahoni bitta yozuvda saqlash: rang (green/yellow/red yoki '') va ishtirokchi
    // tarixi birga — admindagi "Saqlash" aynan shu amalni chaqiradi. Parol bilan.
    if (data && data.action === 'review') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      var rid = String(data.submissionId || '').trim();
      if (!rid) return json({ ok: false, error: 'no id' });
      var rstatus = String(data.status || '');
      var rdot = STATUS_MAP[rstatus] || '';            // nomaʼlum/boʻsh qiymat katakni tozalaydi
      var rhist = (data.history == null) ? '' : String(data.history);
      var rlr = sheet.getLastRow();
      if (rlr > 1) {
        var rids = sheet.getRange(2, ID_COL, rlr - 1, 1).getValues();
        for (var m = 0; m < rids.length; m++) {
          if (String(rids[m][0]).trim() === rid) {
            var rr = m + 2;
            var sc = sheet.getRange(rr, FIELDS.length + 1);  // holat ustuni
            sc.setNumberFormat('@'); sc.setValue(rdot);
            sc.setHorizontalAlignment('center').setVerticalAlignment('middle');
            var hc = sheet.getRange(rr, FIELDS.length + 2);  // tarix ustuni
            hc.setNumberFormat('@'); hc.setValue(rhist);
            hc.setWrap(true).setVerticalAlignment('middle').setHorizontalAlignment('left');
            // Ixtiyoriy: admin nomzod suratini yuklagan yoki almashtirgan boʻlsa.
            var rphoto = null;
            if (data.photo) {
              rphoto = savePhoto(data.photo, data.photoType, rid);
              if (rphoto) {
                var rpc = sheet.getRange(rr, FIELDS.length + 3);
                rpc.setNumberFormat('@'); rpc.setValue(rphoto);
              }
            }
            var out = { ok: true, submissionId: rid, status: rdot ? rstatus : '', history: rhist, row: rr };
            if (rphoto) out.photo = rphoto;
            return json(out);
          }
        }
      }
      return json({ ok: false, error: 'not found' });
    }

    // Xizmat amallari (test qatorlarini oʻchirish / tuzatish / qayta bezash). Parol bilan.
    if (data && data.action === 'admin') {
      if (!authorized(data)) return json({ ok: false, error: 'forbidden' });
      var res = {};
      if (data.purgeTests) res.purged = purgeTestRows(sheet);
      if (data.repair) res.repaired = repairFormulas(sheet);
      if (data.restyle) { styleHeader(sheet); restyleData(sheet); res.restyled = true; }
      return json({ ok: true, admin: true, result: res });
    }

    // Takror yuborilgan boʻlsa (bu submissionId allaqachon bor) — qayta yozmaymiz.
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
    // Kataklarni yozishdan OLDIN formatlaymiz: vaqtdan boshqa hammasi matn ('@').
    // Shunda Sheets "+998…" ni formula deb oʻqimaydi (#ERROR!) va uzun yoki nol
    // bilan boshlanadigan raqamlarni buzmaydi — har qanday qator va ustunda.
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

    // Nomzod surati → Drive → surat ustunida (n+3) koʻrish havolasi.
    var photoUrl = '';
    if (data.photo) {
      photoUrl = savePhoto(data.photo, data.photoType, subId || String(targetRow));
      if (photoUrl) {
        var pcell = sheet.getRange(targetRow, FIELDS.length + 3);
        pcell.setNumberFormat('@'); pcell.setValue(photoUrl);
      }
    }

    return json({ ok: true, duplicate: false, row: targetRow, photo: photoUrl });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------------------------------------------------------------- GET (holat) */
function doGet() {
  return json({ ok: true, service: 'UPOP_casting', time: new Date() });
}

/* ---------------------------------------------------------------- surat (Drive)
   base64 rasmni dekodlab, alohida Drive papkasiga saqlaymiz, havola orqali
   koʻrishga ochamiz va <img> koʻrsata oladigan URL qaytaramiz. Xato boʻlsa ''
   qaytadi — surat muammosi arizaning oʻzini saqlashga toʻsqinlik qilmasin. */
function savePhoto(dataUrl, mime, name) {
  try {
    var b64 = String(dataUrl || '');
    var comma = b64.indexOf(',');
    if (comma >= 0) b64 = b64.substring(comma + 1);   // "data:image/...;base64," qismini olib tashlaymiz
    if (!b64) return '';
    var type = String(mime || 'image/jpeg');
    var ext = type.indexOf('png') >= 0 ? 'png' : (type.indexOf('webp') >= 0 ? 'webp' : 'jpg');
    var bytes = Utilities.base64Decode(b64);
    var blob = Utilities.newBlob(bytes, type, 'upop_' + (name || 'photo') + '.' + ext);
    var file = getPhotoFolder().createFile(blob);
    try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
    // Thumbnail manzili "havolaga ega har kim" fayllar uchun <img> da ishonchli ochiladi.
    return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1000';
  } catch (err) {
    return '';
  }
}

function getPhotoFolder() {
  var it = DriveApp.getFoldersByName(PHOTO_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(PHOTO_FOLDER);
}

/* Faylni joylagach muharrirdan bir marta ishga tushiring — joylashuv Drive
   ruxsatini olsin (suratlar uchun kerak). Keyin Deploy ▸ New version. */
function authorizeDrive() {
  getPhotoFolder();
  return 'ok';
}

/* ---------------------------------------------------------------- qiymatlar */
function cellValue(f, v) {
  if (f.type === 'bool') return v === true || v === 'true' ? 'Ha' : '—';
  if (f.type === 'datetime') {
    var d = v ? new Date(v) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }
  if (v === undefined || v === null) return '';
  return String(v);
}

/* ---------------------------------------------------------------- sarlavhalar */
function ensureHeaders(sheet) {
  var headers = FIELDS.map(function (f) { return f.h; }).concat([STATUS_HEADER, HISTORY_HEADER, PHOTO_HEADER]);
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

/* Sarlavha qatorini yozadi va bezaydi, ustunlar joylashuvini oʻrnatadi. Qayta chaqirish xavfsiz. */
function styleHeader(sheet) {
  var headers = FIELDS.map(function (f) { return f.h; }).concat([STATUS_HEADER, HISTORY_HEADER, PHOTO_HEADER]);
  var total = headers.length; // FIELDS.length + 3 (holat + tarix + surat)

  // Boʻsh 26 ustunli varaqni kengaytiramiz — barcha maydonlar sigʻsin.
  if (sheet.getMaxColumns() < total) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), total - sheet.getMaxColumns());
  }

  var header = sheet.getRange(1, 1, 1, total);
  header.setValues([headers]);
  header
    .setFontSize(12)                 // odatdagi 10 dan kattaroq
    .setFontWeight('bold')
    .setFontColor('#241704')         // oltin ustida toʻq rang
    .setBackground('#D3A63F')        // brend oltini
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 52);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  // Maʼlumotlar qismi uchun ustun kengliklari va gorizontal tekislash.
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
  // baho ustuni (n+1): tor, markazda (rangli nuqta turadi)
  var statusCol = FIELDS.length + 1;
  sheet.setColumnWidth(statusCol, 150);
  if (maxRows >= 2) {
    sheet.getRange(2, statusCol, maxRows - 1, 1)
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
  }
  // tarix ustuni (n+2): keng, chapga, oʻraladi (uzun matnlar)
  var historyCol = FIELDS.length + 2;
  sheet.setColumnWidth(historyCol, 460);
  if (maxRows >= 2) {
    sheet.getRange(2, historyCol, maxRows - 1, 1)
      .setHorizontalAlignment('left').setVerticalAlignment('middle').setWrap(true);
  }
  // surat ustuni (n+3): Drive havolasi
  var photoCol = FIELDS.length + 3;
  sheet.setColumnWidth(photoCol, 320);
  if (maxRows >= 2) {
    sheet.getRange(2, photoCol, maxRows - 1, 1)
      .setHorizontalAlignment('left').setVerticalAlignment('middle');
  }

  // Qatorlarni navbatma-navbat boʻyash faqat maʼlumotlar uchun (2-qatordan) —
  // sarlavhaga tegmaydi, aks holda u kulrang boʻlib qolar edi.
  try {
    var bandings = sheet.getBandings();
    for (var b = 0; b < bandings.length; b++) bandings[b].remove();
    if (maxRows >= 2) {
      sheet.getRange(2, 1, maxRows - 1, total)
        .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
    }
  } catch (err) { /* boʻyash faqat bezak */ }
}

/* Barcha arizalar — maydon kalitlari boʻyicha obyektlar roʻyxati, yangilari oldinda. */
function readAllRows(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return [];
  var n = FIELDS.length;
  var cols = Math.min(n + 3, sheet.getMaxColumns()); // +holat +tarix +surat
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
    obj.status = STATUS_REV[raw] || '';   // green/yellow/red yoki ''
    obj.reviewed = raw !== '';
    obj.history = cols > n + 1 ? String(values[r][n + 1]) : '';
    obj.photo = cols > n + 2 ? String(values[r][n + 2]) : '';
    out.push(obj);
  }
  out.reverse(); // yangilari oldinda
  return out;
}

/* Sheets formulaga aylantirib yuborgan kataklarni tiklash ("+998…" → #ERROR!):
   formulani oʻqib, boshidagi "=" ni olib tashlab, matn sifatida qayta yozamiz. */
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
        cell.setValue(fla.substring(1)); // "=+998…" → "+998…" oddiy matn sifatida
        fixed++;
      }
    }
  }
  return fixed;
}

/* Mavjud barcha qatorlarga vertikal tekislash va vaqt formatini qayta qoʻllaydi. */
function restyleData(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return;
  var range = sheet.getRange(2, 1, last - 1, FIELDS.length);
  range.setVerticalAlignment('middle').setWrap(true);
  sheet.getRange(2, 1, last - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

/* Submission ID si "TEST-" bilan boshlanadigan barcha qatorlarni oʻchiradi (pastdan yuqoriga). */
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
