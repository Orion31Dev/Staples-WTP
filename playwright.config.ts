import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'yarn build && yarn preview',
		port: 4173
	},
	use: {
		video: 'retain-on-failure',
		screenshot: 'only-on-failure',
	}
};

export default config;
