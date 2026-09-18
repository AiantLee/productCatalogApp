# KC Aluminium Product Catalogue

A responsive product-catalogue and enquiry prototype built with plain HTML, CSS,
and JavaScript.

## Run locally

```bash
npm run serve
```

Then open <http://127.0.0.1:4173>.

## Browser tests and screenshots

Playwright is installed as a pinned project dependency rather than downloaded
temporarily through `npx`. This keeps local and CI versions consistent.

```bash
npm install
npm run playwright:install
npm run test:e2e
npm run screenshot
```

`playwright:install` installs Chromium and its Linux system dependencies.
Screenshots are written beneath `test-results/`, separately for the desktop and
mobile Chromium projects.
