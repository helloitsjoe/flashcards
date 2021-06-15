<script>
  import { onMount } from 'svelte';
  import onSwipe, { Directions } from 'swipey';
  import Cards from './Cards.svelte';
  import hiragana from './hiragana';
  import Sounds from './Sounds.svelte';

  onMount(() => {
    const { DOWN } = Directions;
    const off = onSwipe(DOWN, () => {
      window.location.reload();
    });

    return () => {
      off();
    };
  });

  let data = { ...hiragana };

  let groups = [];
  let started = false;

  const startGame = temp => {
    groups = temp.flat();
    started = true;
  };

  $: console.log(groups);
</script>

<main>
  <div class="card">
    {#if !started}
      <Sounds {data} {startGame} />
    {:else}
      <Cards {groups} />
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
