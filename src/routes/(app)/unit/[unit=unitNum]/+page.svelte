<script type="ts">
	import { page } from '$app/stores';
	import { analytics, getDraftStatuses, getQuestions } from '$lib/scripts/firebase';
	import { defaultQuestions, defaultStatuses, statusNames } from '$lib/scripts/util';
	import { logEvent } from 'firebase/analytics';
	import { onMount } from 'svelte';

	const unit = $page.params.unit;
	let statuses = defaultStatuses;
	let questions = defaultQuestions;

	$: unitStatuses = statuses[unit];
	$: unitQuestions = questions[unit];

	onMount(async () => {
		logEvent(analytics, 'page_view', {
			page_title: 'Unit ' + unit,
			page_location: window.location.href,
			page_path: window.location.pathname
		});

		statuses = await getDraftStatuses();
		questions = await getQuestions();
	});
</script>

<svelte:head>
	<title>Unit {unit} | SHS We The People</title>
</svelte:head>

<div class="unit-title">
	<div class="background" style:background-image="url('/imgs/unit{unit}.svg')" />
	<div class="title">Unit {unit}</div>
</div>
<div class="unit-content">
	<div class="sec-title">Questions</div>
	<div class="questions">
		{#if !!unitQuestions}
			{#each Object.keys(unitQuestions) as q, i}
				<div class="question">
					<div class="main">{i + 1}. {unitQuestions[q].main}</div>
					<ul>
						<li>{unitQuestions[q].sub1}</li>
						<li>{unitQuestions[q].sub2}</li>
					</ul>
				</div>
				<div class="status-banner">
					<div class="q">{i + 1}</div>
					<div class="status">{statusNames[unitStatuses[i + 1]]}</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.title {
		font-size: 4em;

		text-align: center;
	}

	.unit-title,
	.unit-content {
		width: 50%;
		min-height: inherit;
	}

	.unit-title {
		position: absolute;

		display: flex;
		float: left;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		height: 100%;

		color: $bkg;
		background: $color;

		.title {
			color: $bkg;
		}

		.background {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;

			opacity: 0.2;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}
	}

	.unit-content {
		float: right;

		box-sizing: border-box;

		.sec-title {
			font-size: 2em;
			font-weight: $font-weight-bold;

			margin: 0.4em 0;

			text-align: center;
		}
	}

	@media screen and (max-width: $mobile-width) {
		.unit-title,
		.unit-content {
			float: none;

			width: 100%;
		}

		.unit-title {
			position: relative;

			height: 40vh;
			min-height: auto;
		}
	}

	.questions {
		margin: 0 auto;
		padding: 0 1em;

		.main {
			font-weight: $font-weight-bold;
		}
	}

	.status-banner {
		z-index: 10;

		display: flex;
		align-items: center;

		width: 80%;
		margin: 0.25em auto 1em;
		padding: 0.25em;

		color: $bkg;
		border-radius: 100px;
		background: $darkblue;

		.q {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 2em;
			height: 2em;

			color: $color;
			border-radius: 50%;
			background: $bkg;
		}

		.status {
			display: flex;
			flex-grow: 1;
			justify-content: center;

			margin-left: -1em;
		}
	}
</style>
