import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/styles/_values.scss" as *;'
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false
		}),
		prerender: {
			concurrency: 1,
			crawl: true,
			enabled: true,
			entries: ['*', '/unit/1', '/unit/2', '/unit/3', '/unit/4', '/unit/5', '/unit/6']
		}
	}
};

export default config;
