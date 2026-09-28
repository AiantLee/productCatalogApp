const { test, expect } = require('@playwright/test');

test('capture desktop and mobile catalogue screenshots', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('#catalogue')).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath(`kc-aluminium-${testInfo.project.name}.png`),
    fullPage: true
  });
});
