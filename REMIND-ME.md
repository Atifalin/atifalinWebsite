# Deployment & Context Reminder for atifalin.in Resume Website

## Deployment Target
- **Platform:** GitHub Pages (repo: `Atifalin/atifalinWebsite`)
- **Custom Domain:** https://atifalin.in
- **DNS:** Managed via Hostinger (A records for root, CNAME for www)

## Key Integrations
- **Download Resume:** PDF at `/files/Resume_Mohammed_Atif_Ali_Neranki.pdf`
- **Contact Form:** Formspree endpoint https://formspree.io/f/xpwreqll
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

## Troubleshooting
- If the site is blank or assets 404, check that `package.json` does NOT have a `homepage` field and that the CNAME file is correct.
- If the PDF doesn't download, verify the file exists at the right path and is committed.
- For contact form issues, confirm the Formspree endpoint in the form action.

---
**This file is for Cascade or future maintainers to quickly regain full project and deployment context.**
