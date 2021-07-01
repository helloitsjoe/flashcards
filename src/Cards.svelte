<script>
  import Card from './Card.svelte';
  export let groups;
  export let shuffleCards;
  export let removeCard;

  // let remaining = [...data];
  let i = 0;
  let side = 0;

  const flip = () => (side = side === 0 ? 1 : 0);

  const getNext = () => (i = i + 1 > groups.length - 1 ? 0 : i + 1);
  const getPrev = () => (i = i - 1 < 0 ? groups.length - 1 : i - 1);

  $: content = groups[i]?.[side];
</script>

<Card on:click={content ? flip : getNext} {content} />
<div class="arrows">
  <button class="arrow" on:click={getPrev}>&lt;</button>
  <button class="arrow" on:click={getNext}>&gt;</button>
</div>
<button on:click={shuffleCards}>Shuffle all</button>
<button on:click={() => removeCard(groups[i])}>I know this one!</button>

<style>
  button {
    padding: 0.4em;
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
