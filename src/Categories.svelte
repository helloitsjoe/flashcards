<script>
  import Sounds from './Sounds.svelte';

  export let categories;
  export let startGame;

  let category = null;

  const clearCategory = () => (category = null);
  const setCategory = cat => (category = cat);

  const handleCategoryClick = cat =>
    cat === 'words'
      ? startGame(Object.entries(categories[cat]))
      : setCategory(cat);
</script>

{#if category}
  <Sounds data={categories[category]} {startGame} {clearCategory} />
{:else}
  <div class="group">
    {#each Object.keys(categories) as cat}
      <button on:click={() => handleCategoryClick(cat)}>{cat}</button>
    {/each}
  </div>
{/if}

<style>
  button {
    display: flex;
    flex: 1;
    justify-content: center;
    min-width: 40%;
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
    flex-wrap: wrap;
    width: 80%;
    margin: 2em;
  }
</style>
