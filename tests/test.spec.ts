import { expect, test } from '@playwright/test';

test('Six unit links appear', async ({ page }) => {
	await page.goto('/units', { waitUntil: 'domcontentloaded' });

	page.on('console', (msg) => {
		for (let i = 0; i < msg.args().length; ++i) {
			console.log(`${i}: ${msg.args()[i]}`);
		}
	});

	await expect(page.locator('.unit-link')).toHaveCount(6);
});
