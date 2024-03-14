<script lang="ts">
	export let value: string;
	export let handleClick: any;
	export let disableBoard: any;
</script>

<button
	disabled={disableBoard}
	type="button"
	class="btn variant-ringed-tertiary size-32 flex items-center justify-center rounded-none"
	on:click={handleClick}
>
	{value || ''}
</button>
