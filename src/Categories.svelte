<script>
  import Sounds from './Sounds.svelte';

  export let categories;
  export let startGame;

  let category = null;
</script>

{#if category}
  <Sounds data={categories[category]} {startGame} />
{:else}
  <div class="group">
    {#each Object.keys(categories) as cat}
      <button on:click={() => (category = cat)}>{cat}</button>
    {/each}
  </div>
{/if}

<style>
  .group {
    display: flex;
    flex-direction: column;
    margin: 5em;
  }
</style>
