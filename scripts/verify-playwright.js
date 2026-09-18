const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const projectRoot = join(__dirname, '..');
const manifest = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
const expectedVersion = manifest.devDependencies?.['@playwright/test'];

if (!expectedVersion) {
  throw new Error('@playwright/test is not declared in devDependencies.');
}

const installedManifest = join(
  projectRoot,
  'node_modules',
  '@playwright',
  'test',
  'package.json'
);

if (!existsSync(installedManifest)) {
  console.log(`@playwright/test ${expectedVersion} is pinned in package.json.`);
  console.log('Dependencies are not installed; run `npm install` when registry access is available.');
  process.exit(0);
}

const installedVersion = JSON.parse(readFileSync(installedManifest, 'utf8')).version;

if (installedVersion !== expectedVersion) {
  throw new Error(
    `Playwright version mismatch: expected ${expectedVersion}, found ${installedVersion}.`
  );
}

console.log(`@playwright/test ${installedVersion} is installed and matches package.json.`);
