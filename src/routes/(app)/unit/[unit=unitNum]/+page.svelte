<script type="ts">
	import { page } from '$app/stores';

	const unit = $page.params.unit;
</script>

<svelte:head>
	<title>Unit {unit} | SHS We The People</title>
</svelte:head>

<div class="unit-title">
	<div class="background" style:background-image="url('/imgs/unit{unit}.svg')" />
	<div class="title">Unit {unit}</div>
</div>
<div class="unit-content">opps</div>

<style lang="scss">
	.title {
		text-align: center;

		font-size: 4em;
	}

	.unit-title,
	.unit-content {
		width: 50%;
		min-height: inherit;
	}

	.unit-title {
		display: flex;
		flex-direction: column;

		float: left;

		justify-content: center;
		align-items: center;

		position: relative;

		background: $color;
		color: $bkg;

		min-height: inherit;

		.title {
			color: $bkg;
		}

		.background {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			opacity: 0.2;

			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
	}

	.unit-content {
		float: right;
	}
</style>
