<script lang="ts">
	import { getDraftStatuses, updateStatus } from '$lib/scripts/firebase';
	import { defaultStatuses, statusNames } from '$lib/scripts/util';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let statuses = defaultStatuses;

	export let admin = false;

	onMount(async () => {
		statuses = await getDraftStatuses();
	});

	let curDrag = null as { element: HTMLElement; unit: string; q: number } | null;

	let adminStatusBannerText = '';
	let adminStatusError = false;

	function ondragstart(e: DragEvent, unit: string, q: string) {
		e.dataTransfer?.setData('text/plain', JSON.stringify({ unit, q }));

		curDrag = {
			element: e.target as HTMLElement,
			unit,
			q: parseInt(q)
		};

		const ele = e.target as HTMLElement;
		ele.style.opacity = '0.4';
	}

	function ondragend(e: DragEvent) {
		const ele = e.target as HTMLElement;
		ele.style.opacity = '1';
	}

	function ondragover(e: DragEvent) {
		const ele = e.currentTarget as HTMLElement;
		if (curDrag?.unit !== ele.id.split('-')[0]) return;

		ele.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
		e.preventDefault();
	}

	function ondragleave(e: DragEvent) {
		// Get the element hovered over
		const ele = e.currentTarget as HTMLElement;

		ele.style.backgroundColor = 'transparent';
	}

	async function ondrop(e: DragEvent) {
		const target = e.currentTarget as HTMLElement;

		target.style.backgroundColor = 'transparent';
		if (!curDrag) return;
		const { unit, q } = curDrag;

		if (unit !== target.id.split('-')[0]) return;

		if (unit && q) {
			statuses[unit][q] = Number(target.id.split('-')[1]);
		}

		try {
			await updateStatus(Number(unit), q, Number(target.id.split('-')[1]));
			adminStatusBannerText = 'Changes saved.';
		} catch (e) {
			const err = e as Error;
			adminStatusBannerText = err.message;
			adminStatusError = true;
		} finally {
			setTimeout(() => {
				adminStatusBannerText = '';
				adminStatusError = false;
			}, 3000);
		}
	}
</script>

<div class="table-wrapper">
	{#if adminStatusBannerText.length}
		<div
			class="admin-status-banner"
			class:error={adminStatusError}
			in:fly={{ duration: 300, x: -500 }}
			out:fly={{ duration: 300, x: -500 }}
		>
			{adminStatusBannerText}
		</div>
	{/if}
	<table class:admin>
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
						<td
							class="dropzone"
							id="{unit}-{c}"
							on:dragover={ondragover}
							on:dragleave={ondragleave}
							on:drop={ondrop}
						>
							{#each Object.keys(statuses[unit]) as q}
								{#if statuses[unit][q] === c}
									<div
										class="q{q} c{c} q"
										draggable={admin}
										on:dragstart={(e) => {
											ondragstart(e, unit, q);
										}}
										on:dragend={ondragend}
									>
										{q}
									</div>
								{/if}
							{/each}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.table-wrapper {
		position: relative;

		overflow-x: scroll;

		box-sizing: border-box;
		width: 100%;
		padding: 0 1em;
	}

	.admin-status-banner {
		position: fixed;
		z-index: 100;
		top: 5em;
		left: -1em;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 2em;
		padding: 0.5em 1em 0.5em 3em;

		color: $bkg;
		border-radius: $border-radius;
		background-color: $color;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);

		&.error {
			color: $bkg;
			background-color: $red;
		}
	}

	table {
		font-size: 1.6em;

		overflow-x: scroll;

		box-sizing: border-box;
		width: 100%;
		min-width: 1000px;
		margin-bottom: 1em;

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
			background-color: $red;

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

		&.admin {
			.q {
				cursor: move;
				transition: all $transition;

				&:hover {
					color: $bkg;
					background: $color;
				}
			}

			tr:nth-child(even) {
				.q:hover {
					color: $red;
					background: $bkg;
				}
			}
		}
	}
</style>
