<script>
	import { afterNavigate } from '$app/navigation';
	import Clock from '$lib/components/Clock.svelte';
	import { getNavLinks } from '$lib/scripts/util';
	import { fly } from 'svelte/transition';

	let mobile = false;
	let width = 1000;

	$: mobile = width < 768;
	let hamburgerOpen = false;

	afterNavigate(() => {
		hamburgerOpen = false;
	});
</script>	

<svelte:window bind:innerWidth={width} />

<header>
	<a class="title" href="/">Staples We the People</a>
	{#if mobile}
		<div
			class="hamburger-menu"
			class:open={hamburgerOpen}
			on:click={() => (hamburgerOpen = !hamburgerOpen)}
		>
			<div class="hamburger" />
			<div class="hamburger" />
			<div class="hamburger" />
		</div>
		{#if hamburgerOpen}
			<div
				class="links"
				in:fly={{ duration: 200, x: 500, delay: 100 }}
				out:fly={{ duration: 700, x: 500 }}
			>
				<div class="title">Links</div>
				{#each getNavLinks() as link}
					<a class="box-link" href={link.path}>{link.name}</a>
				{/each}
			</div>
			<div
				class="links-bkg"
				in:fly={{ duration: 200, x: 500 }}
				out:fly={{ duration: 700, x: 500, delay: 100 }}
			/>
		{/if}
	{:else}
		<div class="links">
			{#each getNavLinks() as link}
				<a class="box-link" href={link.path}>{link.name}</a>
			{/each}
		</div>
	{/if}
</header>

<div class="content">
	<slot />
</div>

<footer>
	<div class="quote">In order to form a more perfect union</div>
	<div class="sep">//</div>
	<div class="credit">Website by <a href="https://ryansalik.com">Ryan Salik</a></div>
	<div class="sep">//</div>
	<a href="https://github.com/rsalik">Source Code</a>
</footer>

<Clock />

<style lang="scss">
	$header-height: 6rem;
	$footer-height: 3rem;

	header {
		display: flex;
		align-items: center;

		height: $header-height;
		padding: 0 1em;

		.links {
			font-family: $font-title;
			font-size: 1.5em;

			display: flex;

			margin-top: 0.5rem;
			margin-left: 1rem;
		}

		.title {
			font-family: $font-title;
			font-size: 1.8em;
		}

		@media (max-width: $mobile-width) {
			position: sticky;
			z-index: 11;
			top: 0;

			justify-content: space-around;

			background: $bkg;

			.links {
				position: fixed;
				z-index: 500;
				top: 0;
				right: 0;
				bottom: 0;

				align-items: center;
				flex-direction: column;

				width: 80%;
				margin: 0;
				padding-top: 0.6em;

				color: $white;
				background: $blue;

				.title {
					margin-bottom: 0.2em;

					color: $white;
				}

				.box-link {
					width: 80%;

					border-color: $white;
				}
			}

			.links-bkg {
				position: fixed;
				z-index: 400;
				top: 0;
				right: 0;
				bottom: 0;

				width: 82%;
				margin: 0;
				padding-top: 0.6em;

				background: $darkblue;
			}
		}

		.hamburger-menu {
			z-index: 1000;

			.hamburger {
				width: 2rem;
				height: 0.1rem;
				margin: 0.4rem 0;

				transition: 0.2s;

				background-color: $color;
			}

			&.open {
				.hamburger:nth-child(1) {
					transform: translate(-0.2rem, 0.5rem) rotate(-45deg);

					background-color: $bkg;
				}

				.hamburger:nth-child(3) {
					transform: translate(-0.2rem, -0.5rem) rotate(45deg);

					background-color: $bkg;
				}
			}
		}
	}

	.content {
		position: relative;

		overflow: hidden;

		min-height: calc(100vh - #{$header-height} - #{$footer-height});
	}

	footer {
		font-weight: $font-weight-light;

		display: flex;
		align-items: center;

		height: $footer-height;
		padding: 0 1em;

		color: $bkg;
		background: $color;

		.sep {
			margin: 0 1rem;

			opacity: 0.8;
		}

		a {
			text-decoration: underline;
		}

		@media (max-width: $mobile-width) {
			justify-content: center;
			*:not(.quote) {
				display: none;
			}
		}
	}
</style>
