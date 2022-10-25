<script>
	import Clock from '$lib/components/Clock.svelte';
	import { getNavLinks } from '$lib/scripts/util';
	import { fly } from 'svelte/transition';

	let mobile = false;
	let width = 1000;

	$: mobile = width < 768;
	let hamburgerOpen = false;
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

		padding: 0 1em;
		height: $header-height;

		.links {
			font-family: $font-title;
			font-size: 1.5em;
			margin-left: 1rem;
			margin-top: 0.5rem;

			display: flex;
		}

		.title {
			font-size: 1.8em;
			font-family: $font-title;
		}

		@media (max-width: $mobile-width) {
			justify-content: space-around;
			position: sticky;
			top: 0;
			z-index: 11;
			background: $bkg;

			.links {
				position: fixed;
				width: 80%;
				background: $blue;

				z-index: 500;

				margin: 0;
				padding-top: 0.6em;

				right: 0;
				top: 0;
				bottom: 0;

				flex-direction: column;
				align-items: center;

				color: $white;

				.title {
					color: $white;
					margin-bottom: 0.2em;
				}

				.box-link {
					width: 80%;
					border-color: $white;
				}
			}

			.links-bkg {
				position: fixed;
				width: 82%;
				background: $darkblue;

				z-index: 400;

				margin: 0;
				padding-top: 0.6em;

				right: 0;
				top: 0;
				bottom: 0;
			}
		}

		.hamburger-menu {
			z-index: 1000;

			.hamburger {
				width: 2rem;
				height: 0.1rem;

				background-color: $color;
				margin: 0.4rem 0;
				transition: 0.2s;
			}

			&.open {
				.hamburger:nth-child(1) {
					background-color: $bkg;
					transform: translate(-0.2rem, 0.5rem) rotate(-45deg);
				}

				.hamburger:nth-child(3) {
					background-color: $bkg;
					transform: translate(-0.2rem, -0.5rem) rotate(45deg);
				}
			}
		}
	}

	.content {
		min-height: calc(100vh - #{$header-height} - #{$footer-height});
	}

	footer {
		height: $footer-height;

		display: flex;
		align-items: center;

		padding: 0 1em;

		background: $color;
		color: $bkg;

		font-weight: $font-weight-light;

		.sep {
			margin: 0 1rem;
			opacity: 0.8;
		}

		a {
			text-decoration: underline;
		}

		@media (max-width: $mobile-width) {
			*:not(.quote) {
				display: none;
			}

			justify-content: center;
		}
	}
</style>
