<script>
	import UnitLink from '$lib/components/UnitLink.svelte';
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
		justify-content: center;

		flex-wrap: wrap;

		@media (min-width: 1000px) {
			.br {
				width: 100%;
			}
		}
	}
</style>
