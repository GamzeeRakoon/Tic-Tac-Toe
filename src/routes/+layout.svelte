<script lang="ts">
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import { gameState } from '$lib/store';
	import '../app.postcss';

	let { update } = gameState;

	const resetGame = () => {
		update( () => {
			return {
				winner: null,
				squares: new Array(9).fill(null),
				xIsNext: true,
			};
		});
  	};

	initializeStores();

</script>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<img alt="Raccoon eating cheese" src="images/ma_cheese.png" class="w-14 rounded-xl"/>
			</svelte:fragment>
			<p class="text-xl">TicTacToe</p>
			<svelte:fragment slot="trail">
				<button 
					type="button" 
					class="btn variant-filled rounded-xl"
					on:click={() => resetGame()}
				>
					reset
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
