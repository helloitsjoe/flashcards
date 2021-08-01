<script>
  import Cards from './Cards.svelte';
  import hiragana from './data/hiragana';
  import katakana from './data/katakana';
  import words from './data/words.json';
  import Categories from './Categories.svelte';
  import NewWord from './NewWord.svelte';
  import { shuffle } from './utils';
  import { onCustomClick } from './custom-click';

  let showDevBar = false;
  onCustomClick(() => (showDevBar = !showDevBar));

  let categories = { hiragana, katakana, words };

  let groups = [];
  let started = false;

  const startGame = temp => {
    groups = temp;
    started = true;
  };

  const shuffleCards = () => (groups = shuffle(groups));
  const removeCard = card => (groups = groups.filter(g => g[0] !== card[0]));
  const handleNewWordAdded = newWords => (groups = Object.entries(newWords));
</script>

<main>
  <div class="card">
    {#if !started}
      <Categories {categories} {startGame} />
    {:else}
      <Cards {groups} {shuffleCards} {removeCard} />
    {/if}
    {#if showDevBar}
      <NewWord
        words={Object.fromEntries(groups)}
        onNewWordAdded={handleNewWordAdded}
      />
    {/if}
  </div>
</main>

<style>
  main {
    background-color: lightgray;
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  .card {
    margin: 0.5rem auto;
    padding-bottom: 3rem;
    width: calc(100% - 1rem);
    /* height: calc(100% - 1rem); */
    min-height: -webkit-fill-available;
    background: white;
    border: 1px solid darkgray;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
</style>
