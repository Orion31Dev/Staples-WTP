<script>
	import { onMount } from 'svelte';
	import WeThePeople from '$lib/components/WeThePeople.svelte';
	import { getNavLinks } from '$lib/scripts/util';

	let fade = false;

	onMount(() => {
		setTimeout(() => {
			fade = true;
		}, 1000);
	});
</script>

<svelte:head>
	<title>SHS We The People</title>
</svelte:head>

<div class="landing flex-align-center">
	<WeThePeople {fade} />
	<div class="content" class:fade={!fade}>
		<div class="title">Staples We the People</div>
		<div class="links">
			{#each getNavLinks() as link}
				<a class="box-link" href={link.path}>{link.name}</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.title {
		font-size: max(2.1em, 7vw);
		margin-top: 2vw;

		position: absolute;

		top: 0;
		bottom: 0.6em;

		display: flex;
		align-items: center;
		justify-content: center;

		left: 0;
		right: 0;
	}

	.links {
		font-size: min(2em, 8vw);
		font-family: $font-title;

		display: flex;
		justify-content: center;

		position: absolute;
		top: 53%;
		left: 0;
		right: 0;

		@media (max-width: $mobile-width) {
			flex-direction: column;
			align-items: center;

			.box-link {
				width: 50%;
				margin: 0.1em 0;
			}
		}
	}

	.content {
		height: 100%;
	}

	// Fade in animation

	.content.fade {
		opacity: 0;
	}

	.content {
		opacity: 1;
		transition: opacity 1s;
	}
</style>
