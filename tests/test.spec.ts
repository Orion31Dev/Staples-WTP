import { expect, test } from '@playwright/test';

test('Six unit links appear', async ({ page }) => {
	await page.goto('http://localhost:4173/units', { waitUntil: 'domcontentloaded' });
	await expect(page.locator('.unit-link')).toHaveCount(6);

});
