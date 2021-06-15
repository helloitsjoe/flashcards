<script>
  import { onMount } from 'svelte';
  import onSwipe, { Directions } from 'swipey';
  import hiragana from './hiragana';
  import { shuffle } from './utils';

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

  // let remaining = [...data];
  let i = 0;
  let side = 0;
  let started = false;

  let pendingSounds = [];
  let sounds = [];

  $: content = sounds[i]?.[side] || 'Start';

  const flip = () => (side = side === 0 ? 1 : 0);

  const getNext = () => (i = i + 1 > sounds.length - 1 ? 0 : i + 1);
  const getPrev = () => (i = i - 1 < 0 ? sounds.length - 1 : i - 1);
  const shuffleCards = () => (sounds = shuffle(sounds));

  const addGroup = e => {
    const { value } = e.target;

    if (pendingSounds[value]) {
      pendingSounds = pendingSounds.filter(g => g !== value);
    } else {
      pendingSounds = [...pendingSounds, value];
    }
  };

  $: console.log(pendingSounds);
  $: console.log(sounds);

  const start = () => {
    // For now just put all sounds in a single array
    const temp = [];
    for (const pending of pendingSounds) {
      temp.push(data[pending]);
    }
    sounds = temp.flat();
    started = true;
  };
</script>

<main>
  <!-- TODO: Break this into components -->
  {#if !started}
    <div class="card">
      <fieldset class="sounds">
        {#each Object.keys(data) as sound}
          <label>
            <input
              type="checkbox"
              value={sound}
              checked={sounds.includes(sound)}
              on:change={addGroup}
            />
            {sound.toUpperCase()}</label
          >
        {/each}
      </fieldset>
      <button on:click={start}>Start</button>
    </div>
  {:else}
    <div class="card">
      <button class="content" on:click={content === 'Start' ? getNext : flip}>
        {content}
      </button>
      <div class="arrows">
        <button class="arrow" on:click={getPrev}>&lt;</button>
        <button class="arrow" on:click={getNext}>&gt;</button>
      </div>
      <button on:click={shuffleCards}>Shuffle all</button>
    </div>
  {/if}
</main>

<style>
  main {
    background-color: lightgray;
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  .sounds {
    margin: 1em;
    font-size: 2em;
    display: grid;
    grid-template-columns: repeat(3, 2.5em);
  }

  .card,
  .card:active {
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

  .content,
  .content:active {
    font-size: 25vw;
    padding: 2.5rem;
    margin: 2.5rem;
    background: none;
    border: none;
  }

  .arrows {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .arrow {
    font-size: 15vw;
    padding: 0;
    border: none;
    background: none;
  }
</style>
