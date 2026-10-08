# Return to Radiance website

## Project

Return to Radiance, a Fully Launched client site (client: Whitney Banks).

- Static HTML, no framework, no build step.
- Hosted on Vercel: team `fully-launched1`, project `return-to-radiance`.
- Auto-deploys on push to `main` from GitHub `Fully-Launched-LLC/return-to-radiance`.
- Live URL: https://return-to-radiance.vercel.app

## Structure

- Pages: `/` (Coaching, `index.html`), `/about` (My Story), `/shop`, `/connect` (newsletter), `/welcome` (post-signup).
- Pages go in folders as `<page>/index.html` so URLs are clean.
- Nav and footer are repeated in every page's HTML; change all five pages together.
- Shared CSS and JS in `/assets` (`styles.css`, `site.js`); images in `/assets/images`. Favicons: `/favicon.ico`, `/assets/favicon.svg`, `/assets/apple-touch-icon.png`.
- Hero photos use `<picture>` with WebP + JPEG fallback, `width`/`height` set, `loading="lazy"` only below the fold.
- Shop products live in one array, `PRODUCTS` in `/assets/site.js` (`name`, `price`, `image`, `url`, `shopifyId`). The `/shop` grid renders from it. Cards currently link to Etsy.
- `vercel.json` redirects the old `/return-to-radiance-with-shop.html` URL to `/`. An inline script on `/` sends the old hash routes (`#/connect`, `#/welcome`, `#/shop`, `#/coaching`) to the real pages.
- `.vercelignore` keeps this file out of the deployment.
- The site was split from a single-file hash-routed page that rendered in quirks mode (no doctype). A few CSS rules marked "quirks-mode layout" in `styles.css` reproduce that layout exactly; don't remove them without checking the design.

## Rules

- Keep it static unless told otherwise.
- Every page links to the shared stylesheet and script.
- Nav links use root-relative paths (`/about`, not `about.html`).
- No base64-embedded images.
- Shopify is the source of truth for products and prices once the shop switches over (see Open Items). Hard-coded prices only as a load-time fallback.
- Newsletter goes to MailerLite via its embedded form only (public form action URL). Never put an API key in client code.
- No secrets in client code (no Shopify Admin tokens, no API keys).
- After any push to `main`, confirm the Vercel production deploy is READY and that every page returns 200.

## Commits

- Author: luke@fullylaunched.com (set in repo-local git config).

## Open Items

1. **Both forms are non-functional.** The newsletter and coaching application forms still use `window.claude.use("db")`, which only exists inside Claude artifacts. On the live site they show their success messages but save nothing. Awaiting Whitney: the email address applications should go to, and the MailerLite embed code for the newsletter.
2. **Verify the Instagram handle.** The links use `idenityarchitect_whitney`; it may be a typo for `identityarchitect_whitney`.
3. **Shopify switch is blocked on Whitney.** Her Shopify store (`return-to-radiance.myshopify.com`) has its storefront password on. 11 of the 16 Etsy products have no clear Shopify match. Echoes of Light is $1,111.11 on the site (Etsy) but $2,222 in Shopify.
