/* ============================================================
   /api/admin — admin paneli soʻrovlari shu yerdan Apps Script ga oʻtadi.
   Har soʻrovga kirgan qurilma haqida maʼlumot qoʻshiladi: IP, joy
   (Vercel geolokatsiyasi), qurilma va brauzer. Apps Script ularni
   "Kirishlar" varagʻiga yozadi.
   ADMIN_PROXY_SECRET oʻrnatilgan boʻlsa, soʻrov shu kalit bilan
   belgilanadi — Apps Script toʻgʻridan-toʻgʻri kelganlarni rad etadi.
   Ishlab chiquvchi: teiior — https://teiior.uz
   ============================================================ */

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycby7z5nB-DfFxk6tBGVCFkMQNpPCdNbHI9DSURAMYiUt8GKPasqRNULcyG-A3lZzZzEIwQ/exec";
const BUDGET_MS = 55000; // vercel.json dagi maxDuration (60 s) ichida

function header(req, name) {
  const v = req.headers[name];
  return String(Array.isArray(v) ? v[0] : v || "").trim();
}

function decode(v) {
  try { return decodeURIComponent(v); } catch (_) { return v; }
}

// User-Agent dan oddiy nom: "iPhone", "Windows" va brauzer.
function describe(ua) {
  let device = "";
  if (/iPhone/.test(ua)) device = "iPhone";
  else if (/iPad/.test(ua)) device = "iPad";
  else if (/Android/.test(ua)) {
    const m = ua.match(/Android [\d.]+; ([^;)]+?)(?: Build[^;)]*)?\)/);
    const model = m ? m[1].trim() : "";
    device = model && model !== "K" && !/^wv$/i.test(model) ? "Android, " + model : "Android";
  } else if (/Macintosh|Mac OS X/.test(ua)) device = "Mac";
  else if (/Windows/.test(ua)) device = "Windows";
  else if (/CrOS/.test(ua)) device = "Chromebook";
  else if (/Linux/.test(ua)) device = "Linux";

  let browser = "";
  if (/Telegram/i.test(ua)) browser = "Telegram";
  else if (/Instagram/.test(ua)) browser = "Instagram";
  else if (/YaBrowser\//.test(ua)) browser = "Yandex Browser";
  else if (/Edg[A-Z]*\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/SamsungBrowser\//.test(ua)) browser = "Samsung Internet";
  else if (/Firefox\/|FxiOS\//.test(ua)) browser = "Firefox";
  else if (/CriOS\/|Chrome\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua)) browser = "Safari";
  return { device, browser };
}

function readBody(req) {
  if (typeof req.body === "string") return Promise.resolve(req.body);
  if (req.body && typeof req.body === "object") return Promise.resolve(JSON.stringify(req.body));
  return new Promise((resolve, reject) => {
    let s = "";
    req.setEncoding("utf8");
    req.on("data", (c) => { s += c; });
    req.on("end", () => resolve(s));
    req.on("error", reject);
  });
}

function send(res, status, text) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(text);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, JSON.stringify({ ok: false, error: "method" }));

  let data;
  try {
    data = JSON.parse(await readBody(req));
  } catch (_) {
    return send(res, 400, JSON.stringify({ ok: false, error: "bad json" }));
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return send(res, 400, JSON.stringify({ ok: false, error: "bad json" }));
  }

  // Bu maydonlarni faqat shu funksiya toʻldiradi — brauzerdan kelganlari tashlab yuboriladi.
  // IP va joy sarlavhalarini Vercel oʻzi qoʻyadi, brauzer ularni soxtalashtira olmaydi.
  delete data._meta;
  delete data._proxy;
  const ua = header(req, "user-agent").slice(0, 400);
  data._meta = {
    ip: (header(req, "x-forwarded-for").split(",")[0] || header(req, "x-real-ip")).trim(),
    country: header(req, "x-vercel-ip-country"),
    region: decode(header(req, "x-vercel-ip-country-region")),
    city: decode(header(req, "x-vercel-ip-city")),
    ua,
    ...describe(ua),
  };
  const secret = String(process.env.ADMIN_PROXY_SECRET || "").trim();
  if (secret) data._proxy = secret;

  const body = JSON.stringify(data);
  const deadline = Date.now() + BUDGET_MS;
  for (let attempt = 0; attempt < 3; attempt++) {
    const left = deadline - Date.now();
    if (left < 2000) break;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), left);
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
        redirect: "follow",
        signal: ctrl.signal,
      });
      const text = await r.text();
      // Sovuq startda Apps Script JSON oʻrniga HTML beradi — qisqa kutib qayta urinamiz.
      if (/^\s*</.test(text)) {
        await new Promise((ok) => setTimeout(ok, 400 * (attempt + 1)));
        continue;
      }
      return send(res, 200, text);
    } catch (_) {
      // tarmoq xatosi yoki vaqt tugadi — keyingi urinish
    } finally {
      clearTimeout(timer);
    }
  }
  return send(res, 502, JSON.stringify({ ok: false, error: "unavailable" }));
};
