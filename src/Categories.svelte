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
  button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 2px solid dodgerblue;
    color: dodgerblue;
    border-radius: 0;
    background: none;
    margin: 0.5em;
    height: 3em;
    text-transform: uppercase;
    font-size: 80%;
    font-weight: 700;
  }

  .group {
    display: flex;
    width: 80%;
    margin: 2em;
  }
</style>
