const { test, expect } = require('@playwright/test');

test('catalogue search and filters update the product results', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Everything you need/i })).toBeVisible();

  await page.getByLabel('Search product catalogue').fill('plasterboard');
  await page.locator('#searchForm').getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('#resultCount')).toHaveText('Showing 1 product');
  await expect(page.getByRole('heading', { name: 'Knauf Standard Plasterboard' })).toBeVisible();

  await page.getByRole('button', { name: /Clear all filters/i }).last().click();
  await expect(page.locator('#resultCount')).toHaveText('Showing 8 products');
});

test('customers can add a product and open the enquiry list', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Add Premium Crescent Window Handle to enquiry').click();
  await expect(page.locator('#enquiryCount')).toHaveText('3');

  await page.getByRole('button', { name: /Enquiry List/i }).click();
  await expect(page.getByRole('complementary', { name: 'Enquiry list' })).toHaveClass(/open/);
  await expect(page.getByText('Premium Crescent Window Handle')).toBeVisible();
});
