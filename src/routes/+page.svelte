<script>
	import { onMount } from 'svelte';
	import WeThePeople from '$lib/components/WeThePeople.svelte';
	import { getNavLinks } from '$lib/scripts/util';
	import { analytics } from '$lib/scripts/firebase';
	import { logEvent } from 'firebase/analytics';

	let fade = false;

	onMount(() => {
		setTimeout(() => {
			fade = true;
		}, 1000);

		logEvent(analytics, 'page_view', {
			page_title: 'Home',
			page_location: window.location.href,
			page_path: window.location.pathname
		});
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

		position: absolute;
		top: 0;
		right: 0;
		bottom: 0.6em;
		left: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		margin-top: 2vw;
	}

	.links {
		font-family: $font-title;
		font-size: min(2em, 8vw);

		position: absolute;
		top: 53%;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;

		@media (max-width: $mobile-width) {
			align-items: center;
			flex-direction: column;

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
		transition: opacity 1s;

		opacity: 1;
	}
</style>
