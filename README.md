# KC Aluminium Product Catalogue

A responsive product-catalogue and enquiry prototype built with plain HTML, CSS,
and JavaScript.

## Run locally

Install [Node.js](https://nodejs.org/) and open a terminal in this project. The
development server works the same way on Windows, macOS, and Linux and does not
require installing the npm dependencies first.

```bash
npm run serve
```

Then open <http://127.0.0.1:4173>.

### Windows (PowerShell or Command Prompt)

```powershell
cd C:\path\to\productCatalogApp
npm run serve
```

Keep that window open while using the catalogue. Press `Ctrl+C` to stop the
server. If Windows Firewall asks for access, allowing **Private networks** is
enough for local development.

## Browser tests and screenshots

Playwright is installed as a pinned project dependency rather than downloaded
temporarily through `npx`. This keeps local and CI versions consistent.

```bash
npm install
npm run playwright:verify
npm run playwright:install
npm run test:e2e
npm run screenshot
```

`playwright:install` installs Chromium and its Linux system dependencies.
Screenshots are written beneath `test-results/`, separately for the desktop and
mobile Chromium projects.

### Verifying the Playwright version

Use `npm run playwright:verify` instead of `npm view`. The verification command
checks the pinned project dependency—and the installed package when present—without
making a registry request. `npm view` always contacts the configured npm registry,
so it cannot be used as an installation check in environments whose outbound proxy
intentionally blocks registry traffic.
