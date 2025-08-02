import { test, expect } from '@playwright/test';

test('homepage loads and shows welcome message', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Welcome')).toBeVisible();
});
