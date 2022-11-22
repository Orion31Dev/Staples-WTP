<script lang="ts">
	import { getLinks } from '$lib/scripts/firebase';
	import { onMount } from 'svelte';

	let links = {} as { [key: string]: string };

	onMount(async () => {
		links = await getLinks();
	});
</script>

<div class="links">
	<div class="title">Links</div>
	{#each Object.keys(links) as link}
		<a href={links[link]} class="box-link link" target="_blank" rel="noopener noreferrer">
			{link}
		</a>
	{/each}
</div>

<style lang="scss">
	.title {
		font-size: 2em;

		margin-bottom: 0.25em;
	}

	.links {
		display: flex;
		align-items: center;
		flex-direction: column;

		.link {
			width: 60%;
			margin: 0.2em 0;
			padding: 0.5em;

			text-align: center;
		}
	}
</style>
