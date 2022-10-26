<script lang="ts">
	import DraftStatusTable from '$lib/components/DraftStatusTable.svelte';
	import { signInWithGoogle, signOut, type User } from '$lib/scripts/firebase';
	import { user } from '$lib/stores/user';
</script>

{#if !!$user}
	{#if $user.isAdmin}
		<div class="text">
			<div class="title">Hello, {$user.displayName}</div>
            <div class="instructions">You can drag and drop questions to update their statuses</div>
		</div>
		<DraftStatusTable admin />
	{:else}
		<div class="wrapper">
			<div class="box no-admin">
				<div class="title">You Don't Have Permission to View This Page</div>
				<div class="user">You are signed in as {$user.email}</div>
				<button on:click={signOut}>Sign Out</button>
			</div>
		</div>
	{/if}
{:else}
	<div class="wrapper">
		<div class="box">
			<div class="title">This Page Requires Authorization</div>
			<button on:click={signInWithGoogle}>Sign in with Google</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		width: 100%;

		text-align: center;
	}

	.box {
		display: inline-flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		max-width: 80vw;
		padding: 1em;

		border: 2px solid $color;
		border-radius: $border-radius;

		.title {
			font-size: 3em;

			margin-bottom: 2rem;
		}

		button {
			font-size: 1.5em;

			padding: 0.5rem 1rem;

			cursor: pointer;
			transition: all $transition;

			border: 2px solid $color;
			border-radius: $border-radius;
			background-color: white;

			&:hover {
				color: $bkg;
				background-color: $color;
			}
		}
	}

	.no-admin {
		color: $red;
		border-color: $red;

		.title {
			font-size: 2.5em;

			margin-bottom: 0;

			color: $red;
		}

		.user {
			font-size: 1.5em;

			margin: 1rem 0 2rem;
		}

		button {
			color: $red;
			border-color: $red;

			&:hover {
				color: $bkg;
				background-color: $red;
			}
		}
	}

	.text {
		font-size: 1.5em;

		margin: 1em 0;

		text-align: center;

		.title {
			font-size: 1.5em;
		}
	}
</style>
