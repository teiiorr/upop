# U POP TREND — milliy kasting sayti

Oʻzbekistondagi 14–19 yoshli yoshlar uchun milliy qoʻshiq tanlovi: tanishtiruv sahifasi,
koʻp qadamli anketa va tashkilotchilar uchun admin panel.

Sayt: [upop.uz](https://upop.uz)

## Imkoniyatlar

- **Sayt** — tanlov haqida maʼlumot, savol-javob va 7 qadamli anketa (surat yuklash bilan).
  Toʻldirilgan anketa Google Sheets jadvaliga yoziladi.
- **Toʻrt til** — Oʻzbekcha, Özbekça (yangi lotin alifbosi), Русский va English.
  Özbekça matnlar oʻzbekcha matndan avtomatik yasaladi: Oʻ→Ö, Gʻ→Ğ, Sh→Ş, Ch→Ç.
- **Admin panel** (`/admin`):
  - arizalar roʻyxati, qidiruv va filtrlar, baho (yashil / sariq / qizil) va ishtirokchi tarixi;
  - bitta varaqli A4 anketani chop etish;
  - statistika: yosh, viloyat, janr va kunlar boʻyicha;
  - **Tahrirlash** — saytdagi barcha matn, raqam va sanalarni toʻrt tilda oʻzgartirish.
    Saqlangan tahrir bir necha soniyada barcha tashrifchilarga yetib boradi.

## Tuzilma

| Fayl | Vazifasi |
|---|---|
| `index.html` | Sayt sahifasi |
| `css/styles.css` | Sayt uslublari |
| `js/content.js` | Saytdagi barcha matnlar (standart qiymatlar) va admin uchun boʻlimlar |
| `js/i18n-kit.js` | Yangi alifboga oʻtkazish va tahrir belgilarini xavfsiz HTML ga aylantirish |
| `js/main.js` | Til almashtirish, animatsiyalar, anketa, tahrirlarni yuklash |
| `admin/index.html` | Admin panel (bitta fayl) |
| `api/content.js` | Vercel funksiyasi: matnlarni Apps Script dan olib, CDN da saqlaydi |
| `google-apps-script/Code.gs` | Google Sheets backend: arizalar, baholar, suratlar, sayt matnlari |
| `google-apps-script/SETUP.md` | Backendni oʻrnatish boʻyicha qoʻllanma |
| `vercel.json` | `admin.upop.uz` manzilini admin panelga yoʻnaltirish |

## Ishga tushirish

Kompyuterda koʻrish uchun loyiha papkasida:

```bash
python3 -m http.server 8931
```

Soʻng brauzerda `http://localhost:8931` ni oching. `/api/content` faqat Vercel da ishlaydi;
kompyuterda sayt matnlarni toʻgʻridan-toʻgʻri Apps Script dan oladi.

## Joylash

- **Sayt va admin** — `main` tarmogʻiga push qilinsa, Vercel avtomatik joylaydi.
- **Backend** — `google-apps-script/Code.gs` oʻzgarsa, uni Apps Script muharririga qoʻyib,
  Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: New version ▸ Deploy orqali yangi versiyani
  joylash kerak. Batafsil — `google-apps-script/SETUP.md`.

## Ishlab chiquvchi

Dizayn va dasturlash — **teiior** · [teiior.uz](https://teiior.uz)

Designed & Developed by teiior.
