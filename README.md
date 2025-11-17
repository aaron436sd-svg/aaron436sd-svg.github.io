# Akácfa Étkezde — Static Website

This repository contains a production-ready static website scaffold for a small traditional Hungarian kifőzde called **Akácfa Étkezde** (1073 Budapest, Akácfa utca 59).

# Akácfa Étkezde — Static Website

This repository contains a production-ready static website scaffold for a small traditional Hungarian kifőzde called **Akácfa Étkezde** (1073 Budapest, Akácfa utca 59).

Included site files:
- `index.html` — Home page
- `napi.html` — Daily menu (Napi Menü)
- `etlap.html` — Full menu (Étlap)
- `about.html` — Rólunk (About)
- `gallery.html` — Galéria (Gallery)
- `contact.html` — Kapcsolat (Contact)
- `admin.html` — Simple local admin editor for daily menu (saves to browser localStorage)
- `admin/` — Netlify CMS admin (for web-based editing)
- `data/daily-menu.json` — Starter daily menu (managed by Netlify CMS)
- `css/styles.css` — Site styles
- `js/main.js` — Small JS for daily menu and forms
- `assets/menu.pdf` — Placeholder printable menu PDF
- `assets/favicon.svg` — Simple site favicon
- `netlify.toml` — Netlify deploy configuration

Preview locally (quick):

```bash
# from repository root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

What I added for editing and hosting
- Netlify CMS admin: `admin/index.html` and `admin/config.yml`. This lets non-technical editors update the daily menu and gallery via a web UI (requires Netlify Identity + Git Gateway).
- Netlify configuration: `netlify.toml` routes `/admin/*` to the CMS and sets the publish directory.
- Netlify Forms wiring: `contact.html` form is configured for Netlify Forms (hidden `form-name`, `data-netlify="true"`).

How to publish and enable the admin editor (Netlify)
1. Create a new site on Netlify and connect this GitHub repository (use the `main` branch).
2. Deploy the site. The repo root is configured as the publish directory in `netlify.toml`.
3. In the Netlify dashboard -> **Identity** -> enable Identity. Invite the restaurant manager's email or allow signups.
4. In Identity -> **Services**, enable **Git Gateway** so Identity users can commit content back to the repo.
5. Visit `https://<your-netlify-site>/admin/` and log in via Netlify Identity. The CMS UI will let you edit the daily menu (`data/daily-menu.json`) and add items to the gallery. Changes are committed to the `main` branch and the site redeploys automatically.

Netlify Forms (contact form)
- The contact form in `contact.html` is already set up to use Netlify Forms. After deploying, Netlify will detect the form and collect submissions in the Netlify dashboard.
- To receive email notifications for submissions, open the form in the Netlify dashboard and add a notification email.

Favicon and performance
- A simple SVG favicon is at `assets/favicon.svg` and included in all pages. Replace it with a brand logo if you have one.
- Images use lazy-loading where possible (`loading="lazy"` in gallery and hero images) for faster page loads.

Next steps I can do for you (pick any):
- Trigger a test deploy on Netlify and verify CMS + forms are active.
- Add Netlify Identity invite instructions and help invite the manager.
- Wire contact form submissions to email via a serverless function + SendGrid (requires SendGrid key).
- Replace placeholder images and `assets/menu.pdf` with real assets and optimize them.

Tell me which next step to take and I will implement it and push the changes.

Serverless email forwarding (SendGrid) — implemented
--------------------------------------------------
I added a Netlify Function at `netlify/functions/send-contact.js` that sends contact messages via the SendGrid API.

Environment variables required in Netlify (Site settings -> Build & deploy -> Environment):
- `SENDGRID_API_KEY` — your SendGrid API key
- `RECIPIENT_EMAIL` — the restaurant email that should receive contact messages
- `SENDER_EMAIL` (optional) — the `from` address used for outgoing mail (defaults to `no-reply@akacfaetkezde.local`)

How it works:
- The contact form is handled in `js/main.js` which sends form data to `/.netlify/functions/send-contact`.
- The function uses the SendGrid REST API to deliver the email to `RECIPIENT_EMAIL`.

To enable this feature:
1. Add `SENDGRID_API_KEY` and `RECIPIENT_EMAIL` to your Netlify site's environment variables.
2. Deploy the site (Netlify will build the function automatically).
3. Test the contact form on the live site — the function will return success or an error message.

Security & notes:
- Keep your SendGrid API key secret — store it only in Netlify environment variables.
- If you prefer another email provider (Mailgun, SMTP), I can adapt the function.




