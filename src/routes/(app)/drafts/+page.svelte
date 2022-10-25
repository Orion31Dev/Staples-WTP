<script lang="ts">
	import { analytics, getDraftStatuses } from '$lib/scripts/firebase';
	import { defaultStatuses, statusNames } from '$lib/scripts/util';
	import { logEvent } from 'firebase/analytics';
	import { onMount } from 'svelte';

	let statuses = defaultStatuses;

	onMount(async () => {
		logEvent(analytics, 'page_view', {
			page_title: 'Draft Statuses',
			page_location: window.location.href,
			page_path: window.location.pathname
		});

		statuses = await getDraftStatuses();
		console.log(statuses);
	});

	/* eslint-disable */
</script>

<table>
	<thead>
		<tr>
			<th style:width="4em">Unit</th>
			{#each statusNames as status}
                <th>{status}</th>
            {/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.keys(statuses) as unit}
			<tr>
				<td>Unit {unit}</td>
				{#each statusNames as _, c}
					<td>
						{#each Object.keys(statuses[unit]) as q}
							{#if statuses[unit][q] === c}
								<div class="q{q} c{c} q">{q}</div>
							{/if}
						{/each}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		font-size: 1.6em;

		width: 95%;
		margin: 0 auto 1em;

		border-collapse: collapse;

		.q {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: 2em;
			height: 2em;
			margin: 0.1em;

			border: 2px solid $color;
			border-radius: 50%;

			&.c4 {
				color: $bkg;
				border-color: $color !important;
				background-color: $color;
			}
		}

		tr:nth-child(even) {
			color: $bkg;
			border-radius: $border-radius;
			background-color: #b31942;

			.q {
				border-color: $bkg;
			}
		}

		th {
			padding: 0.5em;

			color: $bkg;
			background-color: $color;
		}

		th,
		td {
			&:first-child {
				border-top-left-radius: $border-radius;
				border-bottom-left-radius: $border-radius;
			}

			&:last-child {
				border-top-right-radius: $border-radius;
				border-bottom-right-radius: $border-radius;
			}
		}

		td {
			padding: 0.6em;

			text-align: center;
		}
	}
</style>
