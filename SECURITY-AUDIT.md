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
