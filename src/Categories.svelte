<script>
  import Sounds from './Sounds.svelte';
  import { ENABLE_NEW_WORDS, addWord } from './services';

  export let categories;
  export let startGame;

  let category = null;

  let clearCategory = () => (category = null);

  let newWord = '';
  let newTranslation = '';
</script>

{#if category}
  <Sounds data={categories[category]} {startGame} {clearCategory} />
  {#if ENABLE_NEW_WORDS}
    <form
      on:submit|preventDefault={() =>
        addWord({ key: newWord, value: newTranslation }, 'foo')}
    >
      <input bind:value={newWord} />
      <input bind:value={newTranslation} />
      <button>Submit</button>
    </form>
  {/if}
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
