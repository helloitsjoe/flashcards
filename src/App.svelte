<script>
  import Cards from './Cards.svelte';
  import hiragana from './data/hiragana';
  import katakana from './data/katakana';
  import words from './data/words.json';
  import Categories from './Categories.svelte';
  import NewWord from './NewWord.svelte';
  import { shuffle, convertWords } from './utils';
  import { onCustomClick } from './custom-click';
  import { getWordsLocal } from './services';

  let showDevBar = false;
  let toggleAddWord = () => (showDevBar = !showDevBar);
  // onCustomClick(() => (showDevBar = !showDevBar));

  let categories = {
    hiragana,
    katakana,
    words: { ...words, ...getWordsLocal() },
  };

  // Enable this to add hiragana/katakana
  /* let groups = []; */
  /* let started = false; */
  
  let groups = convertWords(categories.words);
  let started = true;

  /* const startGame = temp => { */
  /*   groups = temp; */
  /*   started = true; */
  /* }; */

  const shuffleCards = () => (groups = shuffle(groups));
  const removeCard = card => (groups = groups.filter(g => g[0] !== card[0]));
  const handleNewWordAdded = newWords => (groups = convertWords(newWords));
  // TODO: Sync words
</script>

<main>
  <div class="card">
    <Cards {groups} {shuffleCards} {removeCard} />
    {#if showDevBar}
      <NewWord
        words={Object.fromEntries(groups)}
        onNewWordAdded={handleNewWordAdded}
      />
      <div class="addWord-container">
        <div class="addWord" on:click={toggleAddWord}>-</div>
      </div>
    {:else}
      <div class="addWord-container">
        <div class="addWord" on:click={toggleAddWord}>+</div>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    background-color: lightgray;
    width: 100vw;
    height: 100vh;
    min-height: -webkit-fill-available;
    display: flex;
  }

  .card {
    margin: 0.5rem auto;
    /* padding-bottom: 3rem; */
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    max-width: 440px;
    background: white;
    border: 1px solid darkgray;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .addWord-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .addWord {
    font-size: 3rem;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
  }
</style>
