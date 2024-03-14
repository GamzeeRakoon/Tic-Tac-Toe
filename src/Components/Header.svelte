<script lang="ts">
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	import '../app.postcss';

	initializeStores();
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/"
			><img alt="Raccoon eating cheese" src="images/ma_cheese.png" class="w-14 rounded-xl" /></a
		>
	</svelte:fragment>
	<p class="text-xl">TicTacToe</p>
</AppBar>
