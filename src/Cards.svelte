<script>
  import { shuffle } from './utils';

  export let groups;

  // let remaining = [...data];
  let i = 0;
  let side = 0;

  const flip = () => (side = side === 0 ? 1 : 0);

  const getNext = () => (i = i + 1 > groups.length - 1 ? 0 : i + 1);
  const getPrev = () => (i = i - 1 < 0 ? groups.length - 1 : i - 1);
  const shuffleCards = () => (groups = shuffle(groups));

  $: content = groups[i]?.[side] || 'Start';
</script>

<button class="content" on:click={content === 'Start' ? getNext : flip}>
  {content}
</button>
<div class="arrows">
  <button class="arrow" on:click={getPrev}>&lt;</button>
  <button class="arrow" on:click={getNext}>&gt;</button>
</div>
<button on:click={shuffleCards}>Shuffle all</button>

<style>
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
