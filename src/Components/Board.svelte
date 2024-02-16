<script lang="ts">
    export let value : Number;
    export let handleClick : any;
</script>


<button 
    type="button" 
    class="btn variant-ringed-tertiary size-32 flex items-center justify-center rounded-none"
    on:click={handleClick}
>
    {value || ""}
</button>
