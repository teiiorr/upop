/* ============================================================
   U POP TREND — kasting sayti
   Matnlar js/content.js da, admin tahrirlari Apps Script orqali keladi.
   Standart til: UZ.
   teiior
   ============================================================ */

/* ============================================================
   Tarjima mexanizmi
   ============================================================ */

const LANGS = ["uz", "oz", "ru", "en"];
const LS_KEY = "upop_lang";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   Google Sheets backend (UPOP_casting)
   Joylangan Apps Script Web App manzilini (…/exec) shu yerga qoʻying.
   Oʻrnatish: google-apps-script/SETUP.md
   "" qoldirilsa saqlash oʻchadi (forma koʻrib chiqish uchun ishlayveradi).
   ============================================================ */
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycby7z5nB-DfFxk6tBGVCFkMQNpPCdNbHI9DSURAMYiUt8GKPasqRNULcyG-A3lZzZzEIwQ/exec";

/* Har ariza uchun bitta barqaror id — qayta yuborilsa ham takror qator paydo
   boʻlmaydi (Apps Script shu id boʻyicha tekshiradi). Yuborish muvaffaqiyatli
   boʻlguncha saqlanib turadi. */
const SUBMISSION_ID_KEY = "upop_submission_id";
function getSubmissionId() {
  let id = "";
  try { id = localStorage.getItem(SUBMISSION_ID_KEY) || ""; } catch (_) {}
  if (!id) {
    id =
      (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
      "upop-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem(SUBMISSION_ID_KEY, id); } catch (_) {}
  }
  return id;
}
function clearSubmissionId() {
  try { localStorage.removeItem(SUBMISSION_ID_KEY); } catch (_) {}
}

/* ============================================================
   Matnlar: standart qiymatlar va admin tahrirlari
   Oxirgi tahrirlar localStorage da turadi — sahifa ular bilan
   darhol ochiladi, yangilari esa fonda Apps Script dan soʻraladi.
   ============================================================ */

const CONTENT_KEY = "upop_content";
const HTML_KEYS = new Set(window.UPOP_HTML_KEYS);

/* Har til uchun yakuniy lugʻat: tahrir boʻlsa tahrir, boʻlmasa standart matn.
   HTML kalitlar tahriri belgilashdan xavfsiz HTML ga oʻtkaziladi — xom HTML
   hech qachon qoʻyilmaydi. ÖZ tahrirlanmagan boʻlsa, UZ matnidan yasaladi. */
function buildDict(overrides) {
  const base = window.UPOP_CONTENT;
  const kit = window.UPOP_KIT;
  const c = overrides || {};
  const edited = (key, lang) => {
    const v = c[key] && c[key][lang];
    if (typeof v !== "string" || v === "") return null;
    return HTML_KEYS.has(key) ? kit.markupToHtml(v) : v;
  };

  const dict = {};
  ["uz", "ru", "en"].forEach((lang) => {
    dict[lang] = {};
    Object.keys(base[lang]).forEach((key) => {
      dict[lang][key] = edited(key, lang) ?? base[lang][key];
    });
  });
  dict.oz = {};
  Object.keys(dict.uz).forEach((key) => {
    dict.oz[key] = edited(key, "oz") ?? kit.toOz(dict.uz[key]);
  });
  return dict;
}

function readContentCache() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONTENT_KEY));
    if (saved && saved.v != null && saved.c && typeof saved.c === "object") return saved;
  } catch (_) {}
  return null;
}

let content = readContentCache();
let DICT = buildDict(content && content.c);
let currentLang = null; // ekranda koʻrsatilayotgan til

/* Yangi tahrirlarni soʻraymiz: avval /api/content (Vercel CDN, tez va hammaga bir xil),
   u ishlamasa — Apps Script ning oʻzidan (sovuq startda HTML qaytsa, yana bir marta).
   Javobda v va c boʻlmasa, hech narsa oʻzgarmaydi. Xatolarda jim qolamiz. */
const CONTENT_SOURCES = [
  ["/api/content", 1],
  [SHEET_ENDPOINT ? SHEET_ENDPOINT + "?action=content" : "", 2],
];
let contentCheckedAt = 0;

function fetchJson(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal, cache: "no-store" })
    .then((res) => res.json()) // HTML (sovuq start) boʻlsa — xato, keyingi urinish
    .finally(() => clearTimeout(timer));
}

async function loadContent() {
  contentCheckedAt = Date.now();
  for (const [url, tries] of CONTENT_SOURCES) {
    for (let i = 0; url && i < tries; i++) {
      let res = null;
      try { res = await fetchJson(url, 8000); } catch (_) {}
      if (!res || res.v == null || !res.c || typeof res.c !== "object") continue;
      const v = String(res.v);
      if (v === (content ? String(content.v) : "0")) return; // "0" — tahrir yoʻq
      content = { v, c: res.c };
      try { localStorage.setItem(CONTENT_KEY, JSON.stringify(content)); } catch (_) {}
      DICT = buildDict(content.c);
      // Joriy til qayta qoʻllanadi; forma qiymatlari va qadam joyida qoladi.
      if (currentLang) applyLang(currentLang);
      return;
    }
  }
}

loadContent();

// Ochiq turgan sahifa ham yangilansin: varaqqa qaytganda va har daqiqada.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && Date.now() - contentCheckedAt > 15000) loadContent();
});
setInterval(() => {
  if (document.visibilityState === "visible") loadContent();
}, 60000);

function getLang() {
  const saved = localStorage.getItem(LS_KEY);
  return LANGS.includes(saved) ? saved : "uz";
}

function applyLang(lang) {
  const dict = DICT[lang];
  if (!dict) return;
  currentLang = lang;

  // Özbekça ham oʻzbek tili, faqat alifbosi boshqa.
  document.documentElement.lang = lang === "oz" ? "uz" : lang;
  document.title = dict.meta_title;

  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", dict.meta_desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-ph")];
    if (v != null) el.setAttribute("placeholder", v);
  });

  // Til tanlash roʻyxatlarini sinxronlaymiz
  document.querySelectorAll(".langswitch-select").forEach((select) => {
    select.value = lang;
  });

  localStorage.setItem(LS_KEY, lang);
}

/* ============================================================
   Ishga tushirish
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  // Hero kirish animatsiyasi. Sinxron qoʻshiladi — orqa fondagi brauzer
  // varagʻida ham ishlasin (u yerda requestAnimationFrame toʻxtab turadi).
  document.body.classList.add("is-ready");

  initLangSwitch();
  initNavStuck();
  initMobileMenu();
  initReveal();
  initSectionFx();
  initAccordion();
  initMagnetic();
  initForm();
  initPhoto();

  // URL biror boʻlimga ishora qilmasa, sahifani eng yuqoridan ochamiz.
  if (!location.hash) window.scrollTo(0, 0);
});

// Orqaga/oldinga (bfcache) qaytganda ham tiklaymiz — sahifa aylantirilgan holda ochilmasin.
window.addEventListener("pageshow", (e) => {
  if (e.persisted && !location.hash) window.scrollTo(0, 0);
});

/* ---------- til almashtirish ---------- */

function initLangSwitch() {
  document.querySelectorAll(".langswitch-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      applyLang(e.target.value);
    });
  });
}

/* ---------- nav: aylantirilgach shisha fon ---------- */

function initNavStuck() {
  const nav = document.getElementById("nav");

  if (!nav) return;

  const sentinel = document.createElement("div");

  sentinel.setAttribute("aria-hidden", "true");

  sentinel.style.cssText =
    "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;";

  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([e]) => nav.classList.toggle("is-stuck", !e.isIntersecting),
    {
      rootMargin: "-8px 0px 0px 0px",
    }
  ).observe(sentinel);
}

/* ---------- mobil menyu ---------- */

function initMobileMenu() {
  const burger = document.querySelector(".nav__burger");
  const menu = document.getElementById("mobileMenu");

  if (!burger || !menu) return;

  const toggle = (open) => {
    const isOpen = open ?? !menu.classList.contains("is-open");

    menu.classList.toggle("is-open", isOpen);
    menu.hidden = !isOpen;

    burger.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  };

  burger.addEventListener("click", () => toggle());

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggle(false));
  });
}

/* ---------- aylantirganda paydo boʻlish, ketma-ketlik, sanash, karvon chizigʻi ---------- */

function initReveal() {
  // Guruhlangan elementlarni CSS ketma-ketligi uchun raqamlaymiz.
  document
    .querySelectorAll(
      ".caravan .stop, .steplist .step, .stats .stat, .accordion .ac"
    )
    .forEach((el) => {
      const siblings = [...el.parentElement.children].filter(
        (c) =>
          c.classList.contains(el.classList[0]) ||
          c.classList.contains("stop") ||
          c.classList.contains("step") ||
          c.classList.contains("stat") ||
          c.classList.contains("ac")
      );

      el.style.setProperty("--i", siblings.indexOf(el));
    });

  // Qoʻshni elementlar bir xil kirmasin deb turli yoʻnalishlar beramiz.
  const stat = [
    "reveal--left",
    "reveal--scale",
    "reveal--right",
  ];

  document.querySelectorAll(".stats .stat").forEach((el, i) => {
    el.classList.add(
      "reveal",
      stat[i % 3]
    );
  });

  // qadamlar navbatma-navbat ikki tomondan kiradi (01 chapdan, 02 oʻngdan, 03 chapdan)
  document.querySelectorAll(".steplist .step").forEach((el, i) => {
    el.classList.add(i % 2 ? "reveal--right" : "reveal--left");
  });

  document.querySelectorAll(".accordion .ac").forEach((el) => {
    el.classList.add("reveal--left");
  });

  document.querySelectorAll(".caravan .stop").forEach((el) => {
    el.classList.add("reveal--scale");
  });

  document
    .querySelector(".who__text .h-display")
    ?.classList.add("reveal--blur");

  document
    .querySelector(".apply__kicker")
    ?.classList.add("reveal--blur");

  document
    .querySelector(".apply .card")
    ?.classList.add("reveal--scale");

  if (reduceMotion) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-in"));

    document
      .querySelector(".caravan")
      ?.classList.add("is-in");

    runCountUps(true);

    return;
  }

  // Ikki yoʻnalishli: element koʻringanda is-in qoʻshiladi, yoʻqolganda olinadi —
  // yuqoriga ham, pastga ham aylantirganda qayta oʻynaydi.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // Yoʻnalish faqat oddiy paydo boʻlishlarda hisobga olinadi.
          if (!/reveal--/.test(el.className)) {
            const top = entry.rootBounds
              ? entry.rootBounds.top
              : 0;

            el.classList.toggle(
              "from-above",
              entry.boundingClientRect.top < top
            );
          }

          el.classList.add("is-in");

          if (el.classList.contains("stat")) {
            runCountUps(false);
          }
        } else {
          el.classList.remove("is-in");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => io.observe(el));

  // Karvon chizigʻi ikki yoʻnalishda chiziladi va oʻchadi; u .reveal emas.
  const caravan = document.querySelector(".caravan");

  if (caravan) {
    io.observe(caravan);
  }
}

let countsDone = false;

/* Raqam 0 dan joriy matngacha sanaladi. Matn (admin tahriri boʻlishi mumkin)
   butun son boʻlmasa, sanalmaydi — oʻzicha koʻrsatiladi. */
function runCountUps(instant) {
  if (countsDone) return;

  countsDone = true;

  document.querySelectorAll("[data-count]").forEach((el) => {
    const final = el.textContent;
    const text = final.trim();

    if (instant || reduceMotion || !/^\d+$/.test(text)) {
      return;
    }

    const target = parseInt(text, 10);
    const dur = 900;
    const start = performance.now();
    let shown = final;

    const tick = (now) => {
      // Matn tashqaridan almashgan boʻlsa (til yoki yangi tahrir), toʻxtaymiz.
      if (el.textContent !== shown) return;

      const p = Math.min(
        1,
        (now - start) / dur
      );

      const eased =
        1 - Math.pow(1 - p, 3);

      shown = p < 1 ? String(Math.round(eased * target)) : final;
      el.textContent = shown;

      if (p < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
}

/* ---------- rang sayohati: body ga faol boʻlim belgisi ---------- */

function initSectionFx() {
  const map = [
    [".hero", "hero"],
    ["#who", "who"],
    ["#how", "how"],
    ["#cities", "cities"],
    ["#faq", "faq"],
    ["#apply", "apply"],
  ];

  const secs = map
    .map(([sel, k]) => [
      document.querySelector(sel),
      k,
    ])
    .filter(([el]) => el);

  const set = (k) => {
    document.body.className = document.body.className
      .replace(/\bsec-\w+/g, "")
      .trim();

    document.body.classList.add(
      "sec-" + k
    );

    // Oltin ajratishni yordamchi texnologiyalar uchun ham takrorlaymiz.
    document.querySelectorAll(".nav__desktop a").forEach((a) => {
      if (a.getAttribute("href") === "#" + k) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  set("hero");

  const io = new IntersectionObserver(
    (ents) =>
      ents.forEach((e) => {
        if (!e.isIntersecting) return;

        const hit = secs.find(
          ([el]) => el === e.target
        );

        if (hit) {
          set(hit[1]);
        }
      }),
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }
  );

  secs.forEach(([el]) => io.observe(el));
}

/* ---------- savol-javob akkordeoni ---------- */

function initAccordion() {
  document
    .querySelectorAll(".ac__q")
    .forEach((q) => {
      q.addEventListener("click", () => {
        const open =
          q.getAttribute("aria-expanded") === "true";

        q.setAttribute(
          "aria-expanded",
          open ? "false" : "true"
        );
      });
    });
}

/* ---------- magnit tugma (faqat sichqoncha va animatsiya yoqilganda) ---------- */

function initMagnetic() {
  if (
    reduceMotion ||
    !window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {
    return;
  }

  document
    .querySelectorAll(
      ".hero__cta .btn, .apply .btn--pop"
    )
    .forEach((btn) => {
      let raf = null;

      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();

        const dx =
          (e.clientX -
            (r.left + r.width / 2)) *
          0.22;

        const dy =
          (e.clientY -
            (r.top + r.height / 2)) *
          0.35;

        if (raf) {
          cancelAnimationFrame(raf);
        }

        raf = requestAnimationFrame(() => {
          btn.style.translate =
            `${dx}px ${dy}px`;
        });
      });

      btn.addEventListener("pointerleave", () => {
        if (raf) {
          cancelAnimationFrame(raf);
        }

        btn.style.translate = "";
      });
    });
}

/* ============================================================
   Kasting anketasi — koʻp qadamli forma
   ============================================================ */

/* Nomzod surati: brauzerda kichik JPEG ga siqib, yashirin maydonga data URL
   sifatida qoʻyamiz — JSON yengil qoladi (~100–200 KB). */
function initPhoto() {
  const input = document.getElementById("f-photo");
  const drop = document.getElementById("photoDrop");
  const img = document.getElementById("photoPreview");
  const ph = document.getElementById("photoPh");
  const dataEl = document.getElementById("photoData");
  const typeEl = document.getElementById("photoType");
  if (!input || !dataEl) return;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    compressImage(file, 1000, 0.82)
      .then((dataUrl) => {
        dataEl.value = dataUrl;
        if (typeEl) typeEl.value = "image/jpeg";
        if (img) { img.src = dataUrl; img.hidden = false; }
        if (ph) ph.hidden = true;
        if (drop) drop.classList.add("is-set");
        dataEl.closest(".field")?.classList.remove("has-err");
        const err = dataEl.closest(".field")?.querySelector(".field__err");
        if (err) err.hidden = true;
      })
      .catch(() => { dataEl.value = ""; }); // tekshiruv suratni soʻraydi
  });
}

/* Rasmni kichraytirib JPEG data URL ga aylantiradi (uzun tomoni ≤ maxDim). */
function compressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight));
      const w = Math.max(1, Math.round(image.naturalWidth * scale));
      const h = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(image, 0, 0, w, h);
      try { resolve(canvas.toDataURL("image/jpeg", quality)); }
      catch (e) { reject(e); }
    };
    image.onerror = reject;
    image.src = url;
  });
}

function initForm() {
  const form = document.getElementById("castingForm");
  if (!form) return;

  const panels = [...form.querySelectorAll(".wiz-panel")];
  const steps = [...document.querySelectorAll(".wiz-steps__item")];
  const barFill = document.getElementById("wizBarFill");
  const backBtn = document.getElementById("wizBack");
  const nextBtn = document.getElementById("wizNext");
  const submitBtn = document.getElementById("submitBtn");
  const curEl = document.getElementById("wizCur");
  const errBar = document.getElementById("wizErr");
  const total = panels.length;
  let current = 0; // faol qadam (0 dan)
  let reached = 0; // yetib borilgan eng uzoq qadam (qadamlar orasida sakrash uchun)

  // Har bir telefon maydoniga +998 ni oldindan qoʻyamiz.
  form.querySelectorAll('input[type="tel"]').forEach((ph) => {
    ph.addEventListener("focus", () => {
      if (!ph.value.trim()) ph.value = "+998 ";
    });
  });

  // Foydalanuvchi tuzatishi bilan xatoni olib tashlaymiz.
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    const clear = () => {
      el.closest(".field")?.classList.remove("has-err");
      el.closest(".consent")?.classList.remove("has-err");
      const errNode = el.closest(".field")?.querySelector(".field__err");
      if (errNode) errNode.hidden = true;
      if (errBar) errBar.hidden = true;
    };
    el.addEventListener("input", clear);
    el.addEventListener("change", clear);
  });

  function show(i) {
    current = Math.max(0, Math.min(total - 1, i));
    reached = Math.max(reached, current);
    panels.forEach((p, idx) => p.classList.toggle("is-active", idx === current));
    steps.forEach((s, idx) => {
      s.classList.toggle("is-active", idx === current);
      s.classList.toggle("is-done", idx < current);
      s.classList.toggle("is-reached", idx <= reached);
    });
    if (barFill) barFill.style.transform = "scaleX(" + current / (total - 1) + ")";
    if (curEl) curEl.textContent = String(current + 1);
    if (backBtn) backBtn.hidden = current === 0;
    const last = current === total - 1;
    if (nextBtn) nextBtn.hidden = last;
    if (submitBtn) submitBtn.hidden = !last;
    if (errBar) errBar.hidden = true;
  }

  function validatePanel(panel) {
    const bad = [];
    panel.querySelectorAll("[required]").forEach((el) => {
      let ok = true;
      if (el.type === "checkbox") {
        ok = el.checked;
      } else if (el.type === "email") {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      } else if (el.type === "number") {
        const n = Number(el.value);
        const min = el.min !== "" ? Number(el.min) : -Infinity;
        const max = el.max !== "" ? Number(el.max) : Infinity;
        ok = el.value !== "" && Number.isFinite(n) && n >= min && n <= max;
      } else if (el.type === "tel") {
        ok = el.value.replace(/\D/g, "").length >= 9;
      } else {
        ok = el.value.trim() !== "";
      }
      if (!ok) {
        bad.push(el);
        el.closest(".field")?.classList.add("has-err");
        el.closest(".consent")?.classList.add("has-err");
        const errNode = el.closest(".field")?.querySelector(".field__err");
        if (errNode) errNode.hidden = false;
      }
    });
    return bad;
  }

  function scrollToForm() {
    form.closest(".card")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function goNext() {
    const bad = validatePanel(panels[current]);
    if (bad.length) {
      if (errBar) errBar.hidden = false;
      bad[0].focus({ preventScroll: true });
      bad[0]
        .closest(".field, .consent")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      return;
    }
    show(current + 1);
    scrollToForm();
  }

  nextBtn?.addEventListener("click", goNext);
  backBtn?.addEventListener("click", () => {
    show(current - 1);
    scrollToForm();
  });

  // Qadam nuqtalari: yetib borilgan istalgan qadamga oʻtish mumkin.
  steps.forEach((s, idx) => {
    s.addEventListener("click", () => {
      if (idx <= reached) {
        show(idx);
        scrollToForm();
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Barcha panellarni tekshiramiz; birinchi xatoliga oʻtamiz.
    for (let i = 0; i < total; i++) {
      const bad = validatePanel(panels[i]);
      if (bad.length) {
        show(i);
        if (errBar) errBar.hidden = false;
        bad[0].focus({ preventScroll: true });
        scrollToForm();
        return;
      }
    }

    const lang = currentLang;
    const data = collectData(form, lang);

    submitBtn.classList.add("is-loading");
    submitBtn.querySelector(".btn__label").textContent = DICT[lang].submit_loading;

    try {
      await submitCasting(data);
      clearSubmissionId(); // keyingi toʻldirish — yangi ariza
      showSuccess();
    } catch (err) {
      console.error("[UPOP] submit failed:", err);
      submitBtn.classList.remove("is-loading");
      submitBtn.querySelector(".btn__label").textContent = DICT[lang].submit;
      alert(DICT[lang].err_submit);
    }
  });

  show(0);
}

/* Barcha nomli maydonlarni (checkbox lar va meta bilan) bitta obyektga yigʻadi. */
function collectData(form, lang) {
  const data = {};
  new FormData(form).forEach((v, k) => {
    data[k] = typeof v === "string" ? v.trim() : v;
  });
  form.querySelectorAll('input[type="checkbox"]').forEach((c) => {
    data[c.name] = c.checked;
  });
  data.lang = lang;
  data.submittedAt = new Date().toISOString();
  data.submissionId = getSubmissionId();
  return data;
}


function showSuccess() {
  const wrap =
    document.getElementById(
      "formwrap"
    );

  const ok =
    document.getElementById(
      "success"
    );

  if (wrap) {
    wrap.hidden = true;
  }

  if (ok) {
    ok.hidden = false;

    ok.scrollIntoView({
      behavior:
        reduceMotion
          ? "auto"
          : "smooth",
      block: "center",
    });
  }
}

/* ------------------------------------------------------------
   Bitta arizani SHEET_ENDPOINT dagi Apps Script orqali Google Sheets ga yuboradi.

   • Transport: text/plain POST — "oddiy" CORS soʻrovi (preflight yoʻq, Apps
     Script unga javob bera olmaydi), no-cors rejimida. Yozuv serverda saqlanadi;
     javob oʻqilmasa ham yetkazilgani aniq, faqat haqiqiy tarmoq xatosida rad
     etiladi — shunda foydalanuvchi qayta urinishi mumkin.
   • Takrorlanmaslik: payload da submissionId bor, Apps Script shu boʻyicha
     tekshiradi — qayta yuborish takror qator yaratmaydi.
   • Navbat: Apps Script yozishlarni qulf bilan tartibga soladi.

   SHEET_ENDPOINT boʻsh boʻlsa forma ishlayveradi, lekin hech narsa saqlanmaydi —
   google-apps-script/SETUP.md boʻyicha sozlang.
   ------------------------------------------------------------ */
async function submitCasting(data) {
  if (!SHEET_ENDPOINT) {
    console.warn(
      "[UPOP] SHEET_ENDPOINT is not set — the application was NOT saved. " +
        "See google-apps-script/SETUP.md to connect the UPOP_casting sheet."
    );
    console.log("[UPOP] casting application (not saved):", data);
    return new Promise((resolve) => setTimeout(resolve, 700));
  }

  const body = JSON.stringify(data);
  const req = () => ({
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // oddiy soʻrov → preflight yoʻq
    body,
    redirect: "follow",
  });

  // 1) Oʻqiladigan urinish: "Anyone" uchun joylangan Apps Script
  //    Access-Control-Allow-Origin:* qaytaradi — id ni tozalashdan oldin
  //    yozuv haqiqatan saqlanganini ({ok:true}) tekshirib olamiz.
  let res;
  try {
    res = await fetch(SHEET_ENDPOINT, req());
  } catch (_networkOrCors) {
    // Javobni oʻqib boʻlmadi (CORS yopdi yoki tarmoq uzildi). Soʻrov yetib borgan
    // boʻlishi mumkin, lekin ishonch uchun opaque rejimda qayta yuboramiz —
    // serverdagi submissionId tekshiruvi ikkinchi qator yaratilishiga yoʻl qoʻymaydi.
    // Bu ham oʻtmasa, demak haqiqatan oflayn: xato yuqoriga uzatiladi (id saqlanadi).
    await fetch(SHEET_ENDPOINT, { ...req(), mode: "no-cors" });
    return;
  }

  // Javob oʻqildi — serverning hukmiga ishonamiz.
  let payload = null;
  try { payload = await res.json(); } catch (_) {}
  if (!res.ok || (payload && payload.ok === false)) {
    throw new Error((payload && payload.error) || "HTTP " + res.status);
  }
}

/* ---------- yordamchi ---------- */

