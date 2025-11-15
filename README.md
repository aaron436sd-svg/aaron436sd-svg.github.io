# Akácfa Étkezde — Static Website

This repository contains a production-ready static website scaffold for a small traditional Hungarian kifőzde called **Akácfa Étkezde** (1073 Budapest, Akácfa utca 59).

Files added:
- `index.html` — Home page
- `napi.html` — Daily menu (Napi Menü)
- `etlap.html` — Full menu (Étlap)
- `about.html` — Rólunk (About)
- `gallery.html` — Galéria (Gallery)
- `contact.html` — Kapcsolat (Contact)
- `admin.html` — Simple local admin editor for daily menu (saves to browser localStorage)
- `css/styles.css` — Site styles
- `js/main.js` — Small JS for daily menu and forms
- `assets/menu.pdf` — Placeholder printable menu PDF

Preview locally (simple):

```bash
# from repository root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes for the owner:
- Use `admin.html` on a manager's computer to update today's offer (saved in the browser). For a server-backed CMS or hosted form handling, I can add simple endpoints.
- Replace `assets/menu.pdf` with a real exported PDF for printing.
- Replace Unsplash placeholder images with real photography for best visual results.

If you want, I can also:
- Add a simple Netlify/Forms or serverless function to accept contact form submissions.
- Convert this to a small CMS-backed site (Netlify CMS, Contentful, or a small Node/Express admin API).
