<script lang="ts">
	let squares = new Array(9).fill(null)
	let xIsNext = true;
	$: status = "Next Player: " + (xIsNext ? "X" : "0")


</script>

<div class="h-full flex items-center justify-center">
	  <div class="grid grid-cols-3">
		{#each squares as square, i}
		  <button on:click={()=>{setValue(i)}} type="button" class="btn variant-ringed-tertiary size-32 flex items-center justify-center rounded-none">
			{square?square:""}
		</button>
		{/each}
	  </div>
</div>
  