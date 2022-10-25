import { expect, test } from '@playwright/test';

test('Six unit links appear', async ({ page }) => {
	await page.goto('/units', { waitUntil: 'domcontentloaded' });
	console.log(await page.title());
	expect(await page.locator('.unit-link').count()).toBe(6);
});
