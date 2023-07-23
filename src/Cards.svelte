<script>
  import Card from './Card.svelte';
  export let groups;
  export let shuffleCards;
  export let removeCard;

  let i = 0;

  const getNext = () => (i = i + 1 > groups.length - 1 ? 0 : i + 1);
  const getPrev = () => (i = i - 1 < 0 ? groups.length - 1 : i - 1);

  $: content = groups[i];
</script>

<Card {content} />
<div class="arrows">
  <button class="arrow" on:click={getPrev}>&lt;</button>
  <button class="arrow" on:click={getNext}>&gt;</button>
</div>
<div class="buttons">
  <button on:click={shuffleCards}>Shuffle all</button>
  <button on:click={() => removeCard(groups[i])}>I know this one!</button>
</div>

<style>
  button {
    padding: 0.4em;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    margin-bottom: 3em;
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
