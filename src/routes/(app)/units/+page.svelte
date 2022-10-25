<script>
	import UnitLink from '$lib/components/UnitLink.svelte';
	import { analytics } from '$lib/scripts/firebase';
	import { logEvent } from 'firebase/analytics';
	import { onMount } from 'svelte';

	onMount(() => {
		logEvent(analytics, 'page_view', {
			page_title: 'Units',
			page_location: window.location.href,
			page_path: window.location.pathname
		});
	});
</script>

<svelte:head>
	<title>Units | SHS We The People</title>
</svelte:head>

<div class="unit-links">
	<UnitLink unit={1} />
	<UnitLink unit={2} />
	<UnitLink unit={3} />
	<div class="br" />
	<UnitLink unit={4} />
	<UnitLink unit={5} />
	<UnitLink unit={6} />
</div>

<style lang="scss">
	.unit-links {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;

		@media (min-width: 1000px) {
			.br {
				width: 100%;
			}
		}
	}
</style>
