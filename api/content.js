/* ============================================================
   /api/content — sayt matnlari uchun tezkor manzil.
   Apps Script ga oʻzi boradi (sovuq startda HTML qaytsa, qayta urinadi)
   va javobni Vercel CDN da bir necha soniya saqlaydi. Shunda admin
   tahriri barcha tashrifchilarga tez va bir xil yetib boradi.
   teiior
   ============================================================ */

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycby7z5nB-DfFxk6tBGVCFkMQNpPCdNbHI9DSURAMYiUt8GKPasqRNULcyG-A3lZzZzEIwQ/exec";
const BUDGET_MS = 9000; // funksiya vaqt chegarasidan oshmaslik uchun

// Oxirgi toʻgʻri javob — Apps Script vaqtincha javob bermasa, shuni beramiz.
let last = null;

async function fromSheet() {
  const deadline = Date.now() + BUDGET_MS;
  for (let attempt = 0; attempt < 3; attempt++) {
    const left = deadline - Date.now();
    if (left < 800) break;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), Math.min(6000, left));
    try {
      const res = await fetch(ENDPOINT + "?action=content", { redirect: "follow", signal: ctrl.signal });
      const data = JSON.parse(await res.text());
      if (data && data.v != null && data.c && typeof data.c === "object" && !Array.isArray(data.c)) {
        return { ok: true, v: String(data.v), c: data.c };
      }
    } catch (_) {
      // sovuq start (HTML), tarmoq xatosi yoki vaqt tugadi — qayta urinamiz
    } finally {
      clearTimeout(timer);
    }
    await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
  }
  return null;
}

module.exports = async (req, res) => {
  const fresh = await fromSheet();
  if (fresh) last = fresh;
  const data = fresh || last;

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (!data) {
    res.statusCode = 503;
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ ok: false, error: "unavailable" }));
    return;
  }

  res.statusCode = 200;
  // Brauzer har safar CDN dan soʻraydi; CDN 5 soniya saqlaydi, keyin fonda yangilaydi.
  res.setHeader(
    "Cache-Control",
    fresh ? "public, max-age=0, s-maxage=5, stale-while-revalidate=86400" : "public, max-age=0, s-maxage=1"
  );
  res.end(JSON.stringify(data));
};
