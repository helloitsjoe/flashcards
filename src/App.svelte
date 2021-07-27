<script>
  import Cards from './Cards.svelte';
  import hiragana from './data/hiragana';
  import katakana from './data/katakana';
  import Categories from './Categories.svelte';
  import { shuffle } from './utils';

  let categories = { hiragana, katakana };

  let groups = [];
  let started = false;

  const startGame = temp => {
    groups = temp.flat();
    started = true;
  };

  const shuffleCards = () => (groups = shuffle(groups));
  const removeCard = card => (groups = groups.filter(g => g[0] !== card[0]));

  $: console.log(groups);
</script>

<main>
  <div class="card">
    {#if !started}
      <Categories {categories} {startGame} />
    {:else}
      <Cards {groups} {shuffleCards} {removeCard} />
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
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    min-height: -webkit-fill-available;
    background: white;
    border: 1px solid darkgray;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
