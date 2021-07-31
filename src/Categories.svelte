<script>
  import Sounds from './Sounds.svelte';
  import { ENABLE_NEW_WORDS, addWord } from './services';

  export let categories;
  export let startGame;

  let category = null;

  const clearCategory = () => (category = null);
  const setCategory = cat => (category = cat);

  const handleCategoryClick = cat =>
    cat === 'words'
      ? startGame(Object.entries(categories[cat]))
      : setCategory(cat);

  let newWord = '';
  let newTranslation = '';
  let warning = '';

  let token = sessionStorage.getItem('flashcards-token') || '';
  let showTokenInput = !token;
</script>

{#if warning}
  <h2>{warning}</h2>
{/if}

{#if category}
  <Sounds data={categories[category]} {startGame} {clearCategory} />
  {#if ENABLE_NEW_WORDS}
    <form
      on:submit|preventDefault={async () => {
        if (newWord in categories[category]) {
          warning = `${newWord} already exists in this category!`;
          return;
        }

        showTokenInput = !token;

        try {
          await addWord({ key: newWord, value: newTranslation }, token);

          showTokenInput = false;
          newWord = '';
          newTranslation = '';
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <input bind:value={newWord} />
      <input bind:value={newTranslation} />
      {#if showTokenInput}
        <input bind:value={token} />
      {/if}
      <button>Submit</button>
    </form>
  {/if}
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
