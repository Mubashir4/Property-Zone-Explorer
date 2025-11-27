import { test, expect } from '@playwright/test';

test.describe('Property Search', () => {
  test('should load the search page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Banner17')).toBeVisible();
  });

  test('should display property cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    const cards = page.locator('[class*="MuiCard"]');
    await expect(cards.first()).toBeVisible();
  });
});

