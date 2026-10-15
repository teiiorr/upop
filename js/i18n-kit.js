/* ============================================================
   Matn vositalari — sayt va admin uchun umumiy.
   • toOz: joriy lotin yozuvini yangi alifboga (Özbekça) oʻtkazadi:
     Oʻ→Ö, Gʻ→Ğ, Sh→Ş, Ch→Ç. Teglar, havolalar, e-mail, @nik va
     #xeshteglarga tegmaydi.
   • markupToHtml / htmlToMarkup: admin tahrirlaydigan oddiy belgilash
     (*oltin*, [matn](https://…), yangi qator) ↔ xavfsiz HTML.
   Ishlab chiquvchi: teiior — https://teiior.uz
   ============================================================ */
(function (root) {
  "use strict";

  // Oʻ/Gʻ dagi belgi: toʻgʻri ʻ va klaviaturadan keladigan ‘ ’ ' ` variantlari.
  var TURNED = "[ʻ‘’'`]";
  var RULES = [
    [new RegExp("O" + TURNED, "g"), "Ö"], [new RegExp("o" + TURNED, "g"), "ö"],
    [new RegExp("G" + TURNED, "g"), "Ğ"], [new RegExp("g" + TURNED, "g"), "ğ"],
    [/S[Hh]/g, "Ş"], [/sh/g, "ş"],
    [/C[Hh]/g, "Ç"], [/ch/g, "ç"]
  ];

  // Oʻzgartirilmaydigan boʻlaklar: teg, havola, e-mail, @nik, #xeshteg, domen.
  var KEEP = /(<[^>]*>|https?:\/\/[^\s<>()"']+|www\.[^\s<>()"']+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|@[\w.]+|#\w+|\b[\w-]+\.(?:uz|com|ru|org|net|me|io)\b)/;

  function toOz(s) {
    if (typeof s !== "string" || !s) return s;
    var parts = s.split(KEEP);
    for (var i = 0; i < parts.length; i += 2) {
      var p = parts[i];
      for (var r = 0; r < RULES.length; r++) p = p.replace(RULES[r][0], RULES[r][1]);
      parts[i] = p;
    }
    return parts.join("");
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Belgilashdan HTML: hamma narsa ekranlanadi, faqat uchta shakl tegga aylanadi.
  function markupToHtml(src) {
    var out = esc(src == null ? "" : src).replace(/\r\n?/g, "\n");
    out = out.replace(/\[([^\]\n]+)\]\(((?:https?:\/\/|mailto:|tel:)[^\s()]+)\)/g, function (_, text, url) {
      var ext = /^https?:/.test(url);
      return '<a href="' + url + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + text + "</a>";
    });
    out = out.replace(/\*([^*\n]+)\*/g, '<span class="hl">$1</span>');
    return out.replace(/\n/g, "<br>");
  }

  // HTML dan belgilashga — admin maydonida koʻrsatish uchun.
  function htmlToMarkup(html) {
    return String(html == null ? "" : html)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<span class="hl">([\s\S]*?)<\/span>/gi, "*$1*")
      .replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  }

  var kit = { toOz: toOz, markupToHtml: markupToHtml, htmlToMarkup: htmlToMarkup };
  root.UPOP_KIT = kit;
  if (typeof module !== "undefined" && module.exports) module.exports = kit;
})(typeof window !== "undefined" ? window : this);
