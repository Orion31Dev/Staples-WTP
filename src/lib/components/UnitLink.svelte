<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	export let unit = 1;

	if (unit > 6 || unit < 1) {
		unit = 1;
	}
</script>

{#if visible}
	<a class="unit-link" href="/unit/{unit}" in:fade={{ duration: 200, delay: 40 * (unit - 1) }}>
		<object data="/imgs/unit{unit}.svg" type="image/svg+xml" title="Unit {unit} Link" />
	</a>
{/if}

<style lang="scss">
	.unit-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		width: 300px;
		height: 300px;
		margin: 1rem;

		transition: background-color $transition, transform $transition;

		border-radius: $border-radius * 3;
		background: $blue;

		@media (max-width: $mobile-width) {
			width: 42vw;
			height: 42vw;
			margin: 0.5rem;

			border-radius: $border-radius * 2;
		}

		&:hover {
			transform: scale(1.05);

			background: $darkblue;
		}

		object {
			height: 80%;

			pointer-events: none;
		}
	}
</style>
