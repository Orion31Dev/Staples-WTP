<script lang="ts">
	const statuses = [
		[1, 0, 0],
		[3, 3, 4],
		[4, 4, 4],
		[1, 2, 3],
		[3, 2, 1],
		[2, 4, 1]
	];
</script>

<table>
	<thead>
		<tr>
			<th style:width="4em">Unit</th>
			<th>Needs Work</th>
			<th>Ok. More Work To Do</th>
			<th>Close</th>
			<th>Even Closer</th>
			<th>Done</th>
		</tr>
	</thead>
	<tbody>
		{#each [...Array(6).keys()] as i}
			<tr>
				<td>Unit {i + 1}</td>
				{#each [...Array(5).keys()] as c}
					<td>
						{#each [...Array(3).keys()] as q}
							{#if statuses[i][q] === c}
								<div class="q{q + 1} c{c} q">{q + 1}</div>
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
