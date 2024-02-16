<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.postcss';
</script>


<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<img alt="Raccoon eating cheese" src="images/ma_cheese.png" class="w-14 rounded-xl"/>
			</svelte:fragment>
			<p class="text-xl">TicTacToe</p>
			<svelte:fragment slot="trail">
				<button type="button" class="btn variant-filled rounded-xl">
					reset
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
