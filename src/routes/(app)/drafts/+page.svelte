<script lang="ts">
	import DraftStatusTable from '$lib/components/DraftStatusTable.svelte';
	import { analytics } from '$lib/scripts/firebase';
	import { logEvent } from 'firebase/analytics';
	import { onMount } from 'svelte';

	onMount(async () => {
		logEvent(analytics, 'page_view', {
			page_title: 'Draft Statuses',
			page_location: window.location.href,
			page_path: window.location.pathname
		});
	});
</script>

<DraftStatusTable />

<style lang="scss">
	.unit-3 {
		font-size: 1.5em;

		box-sizing: border-box;
		width: 97%;
		margin: 0.5em auto;
		padding: 0.5em;
	}
</style>
