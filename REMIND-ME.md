# Deployment & Context Reminder for atifalin.in

## Deployment Target
- **Platform:** GitHub Pages (repo: `Atifalin/atifalinWebsite`)
- **Custom Domain:** https://atifalin.in
- **DNS:** Managed via Hostinger (A records for root, CNAME for www)

## Key Integrations
- **Download Resume:** PDF at `/files/Resume_Mohammed_Atif_Ali_Neranki.pdf`
- **Contact Form:** Formspree endpoint `https://formspree.io/f/xpwreqll` (submitted via `fetch`, shows an
  inline success state instead of redirecting)
- **No `homepage` field** in `package.json` (for correct asset paths with custom domain)
- **CNAME file** present in `public/` with `atifalin.in`

## Manual Deployment Steps
1. Make your code/content changes
2. (If updating resume PDF) Place the new file at `public/files/Resume_Mohammed_Atif_Ali_Neranki.pdf`
3. Run:
   ```sh
   npm run build
   npm run deploy
   ```
4. Wait for deployment to finish
5. Hard refresh https://atifalin.in to see your changes

## Site structure (rebuilt Aug 2026)
Story-driven single page. All content lives in data arrays at the top of `src/App.js` — edit those
rather than the JSX:

| Constant | Section |
| --- | --- |
| `NAV` | Nav items (ids must match section ids) |
| `CHAPTERS` | "The story" — six narrative chapters, optional `aside` pull-quote |
| `CASES` | "Signature work" — problem / action / result case studies |
| `NUMBERS` | Metrics band (dark section) |
| `TOOLKIT`, `LEARNING` | Skills, plus an honest "currently learning" list |
| `PATH` | Experience timeline |
| `EDUCATION`, `CERTS`, `LANGUAGES` | Education panels |
| `PROJECTS` | Side projects |

Design tokens (colours, fonts, radii, shadows) are CSS custom properties in `:root` at the top of
`src/App.css`. Fonts are loaded in `public/index.html`: Inter (UI), Instrument Serif (display),
JetBrains Mono (labels/numbers).

## Content accuracy — important
Résumé content is kept in sync with the master profile at
`~/Work/Resumes/profile.md` (iCloud). **Before editing claims on this site, read that file.**

Specifically, the following must NOT reappear (they were on the old site and are not true):
- "machine learning techniques"
- "AI-driven analytics" / "predictive modelling"
- "AI-powered demand forecasting"

The accurate version: forecasting and the 12% inventory-cost reduction came from **Excel and Power BI
analytics**; Python/pandas was used for **forecast error (MAPE) decomposition**, not for building
forecast models.

## Troubleshooting
- Blank page or 404 assets → check `package.json` has NO `homepage` field, and that `public/CNAME` is correct
- PDF not downloading → verify the file exists at `public/files/` and is committed
- Contact form → confirm the Formspree endpoint in the `onSubmit` handler in `src/App.js`

---
**This file is for future maintainers (human or agent) to quickly regain project and deployment context.**
