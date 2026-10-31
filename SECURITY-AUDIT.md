# PrivaGlobe website: security audit (28 Oct 2026)

Scope: index.html, 404.html, all service, industry and legal pages (12 HTML files), assets/style.css, sitemap, robots, CNAME, README, and hosting on GitHub Pages with the Web3Forms contact form.

Overall: the site is static with no server code, no database and no user-generated content, so the attack surface is small. No DOM-XSS sinks were found (all dynamic text uses `textContent`; the only `innerHTML` writes are fixed strings in the menu toggle). The issues below are mostly hardening gaps.

Status key: FIXED = applied by `fix_security.py` / new files. MANUAL = cannot be fixed in code; action needed in GitHub, DNS or Web3Forms.

## Findings

| # | Severity | Issue | Status |
|---|----------|-------|--------|
| 1 | High | No Content-Security-Policy. Any injected script would run freely. Inline scripts on all 5 pages prevented a strict policy. | FIXED: inline JS moved to `assets/site.js` and `assets/home.js` (dropdowns already used `assets/nav.js`); meta CSP added with `script-src 'self'` (no `unsafe-inline`) |
| 2 | High | Web3Forms `access_key` is public in the page source and the form can be scripted by anyone, so the inbox can be spammed and the quota burned. | MANUAL: in the Web3Forms dashboard restrict the key to the domain www.privaglobe.com and enable their captcha/spam filter. Honeypot `botcheck` is already present. |
| 3 | Medium | No security response headers (HSTS, X-Frame-Options / frame-ancestors, X-Content-Type-Options, Permissions-Policy). GitHub Pages cannot set custom headers. | PARTIAL: frame-busting added in `site.js`, referrer policy via meta. MANUAL for the rest: put Cloudflare (free) in front of the site and add the headers there. |
| 4 | Medium | Clickjacking: the site can be framed by any other site. | PARTIAL: frame-busting script added (meta CSP cannot carry `frame-ancestors`); full fix needs the Cloudflare header above. |
| 5 | Medium | Google Fonts loaded from Google's servers on every page. This leaks every visitor's IP to a third party (a privacy risk, and awkward for a GDPR consultancy) and gives a third party control over page styling. | FIXED: all pages now use the self-hosted fonts in `/fonts/` via `assets/fonts.css`; Google hosts removed from the CSP |
| 6 | Medium | Contact form collects personal data with no privacy notice or consent line. | FIXED: the site already has `privacy-policy.html`; a consent line linking to it is now above the Send button. Have a lawyer review the policy wording. |
| 7 | Low | Form fields had no length limits or autocomplete hints (oversized input, poor autofill). | FIXED: `maxlength`, `autocomplete` added |
| 8 | Low | Placeholder Facebook link (`https://www.facebook.com/`) points to Facebook's homepage rather than your page. | FIXED: removed until a real page URL exists |
| 9 | Low | External links used `rel="noopener"` only, which still sends the referrer. | FIXED: `noopener noreferrer` |
| 10 | Low | No Referrer-Policy. | FIXED: meta referrer `strict-origin-when-cross-origin` |
| 11 | Low | No `security.txt` for responsible disclosure. | FIXED: `.well-known/security.txt` added (served because `.nojekyll` is present) |
| 12 | Info | HTTPS enforcement and account hygiene cannot be verified from the code. | MANUAL: GitHub Settings > Pages > tick Enforce HTTPS; enable 2FA on the GitHub account; protect `main` (require PR / block force-push); keep the repo free of secrets. |
| 13 | Info | DNS: apex A records and `www` CNAME must not be left dangling if the repo or Pages site is ever removed (subdomain takeover). | MANUAL: delete DNS records if you retire the site; verify the domain under GitHub profile > Settings > Pages. |
| 14 | Info | Email and phone are plain text, so scrapers will collect them. Accepted: this is public business contact information. | ACCEPTED |
| 15 | Info | README is stale (says the form only shows a confirmation and mentions Formspree). | FIXED: README updated |

## Notes on the CSP
- `style-src` still allows `'unsafe-inline'` because the home page has a large inline `<style>` block and many `style=""` attributes. Risk is low (CSS cannot execute code); moving it to a file is a later cleanup.
- JSON-LD `<script type="application/ld+json">` blocks are data, not executed, so they are unaffected.

## Follow-up audit (31 Oct 2026)

Scope: full Git history (29 commits), all tracked files, deploy workflow.

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| 16 | Medium | The deploy workflow published the whole repository (`path: '.'`), so `SECURITY-AUDIT.md` and `README.md` were publicly downloadable from the live site. | FIXED: workflow now stages only site files into `_site` (excludes `*.md`, `.git`, `.github`, `.gitignore`) |
| 17 | Low | Four stray 1-byte files named `A` (assets/, dpdp-..., dpo-..., gdpr-...) were being published. | FIXED: removed |
| 18 | Low | No `.gitignore`, so a future `.env`, key or database file could be committed by accident. | FIXED: added |
| 19 | Low | GitHub Actions versions were not kept up to date automatically. | FIXED: `.github/dependabot.yml` added (weekly) |
| 20 | Low | CSP did not block framing of other content or force HTTPS for sub-resources. | FIXED: `frame-src 'none'; upgrade-insecure-requests` added on all 18 pages |
| 21 | Low | Contact form could be double-submitted quickly and did not stop on the honeypot client-side. | FIXED: 30 s client-side cooldown and honeypot check in `assets/home.js` (real rate limiting must be done in Web3Forms, see #2) |
| 22 | Info | Git history scanned for private keys, tokens, `.env`, database and key files: none found. The only credential-like value is the Web3Forms access key, which is public by design. | CLEAN |
| 23 | Info | No backend, database, login, admin area, passwords or package dependencies exist, so those controls do not apply. | N/A |

Still manual (cannot be done in code on GitHub Pages): restrict the Web3Forms key to www.privaglobe.com and turn on its spam/captcha filter; put Cloudflare (free) in front for HSTS, X-Frame-Options / frame-ancestors, X-Content-Type-Options and Permissions-Policy headers; enable 2FA on the GitHub account; protect `main` (require pull requests, block force-push); tick Enforce HTTPS in Pages settings.
