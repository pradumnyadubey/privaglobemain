# PrivaGlobe website

Static site for www.privaglobe.com, hosted on GitHub Pages.

## Deploy
1. Create a GitHub repository (for example `privaglobe-website`) and upload all files in this folder to the `main` branch root.
2. Repository Settings > Pages > Source: "Deploy from a branch", Branch: `main`, Folder: `/ (root)`. Save.
3. Under "Custom domain", enter `www.privaglobe.com` (the CNAME file already contains it) and tick "Enforce HTTPS" once available.

## DNS (at your domain registrar)
| Type  | Host | Value |
|-------|------|-------|
| CNAME | www  | `<your-github-username>.github.io` |
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |

DNS can take from a few minutes to 24 hours to propagate. Confirm the A record IPs against GitHub's current documentation before saving.

## Before launch
- Connect the contact form (it currently only shows a confirmation message), for example with Formspree.
- Replace the Facebook, Instagram and LinkedIn links with your company page URLs.
- Replace sample dashboard figures with real information when available.

## Security
See `SECURITY-AUDIT.md` for the audit, fixes applied, and the manual steps still open (Web3Forms domain restriction, Cloudflare headers, GitHub account hardening).
