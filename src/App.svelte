<script>
  import hiragana from './hiragana';

  let data = [...hiragana];

  // let remaining = [...data];
  let currentIdx = 0;
  let side = 0;

  $: content = data[currentIdx][side] || 'Start';

  const flip = () => {
    side = side === 0 ? 1 : 0;
  };

  const getNext = () => {
    currentIdx = currentIdx + 1 > data.length - 1 ? 0 : currentIdx + 1;
  };

  const getPrev = () => {
    currentIdx = currentIdx - 1 < 0 ? data.length - 1 : currentIdx - 1;
  };

  const shuffle = arr => {
    const temp = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    data = temp.filter(card => card.length);
  };
</script>

<main>
  <div class="card">
    <button class="content" on:click={content === 'Start' ? getNext : flip}>
      {content}
    </button>
    <div class="arrows">
      <button class="arrow" on:click={getPrev}>&lt;</button>
      <button class="arrow" on:click={getNext}>&gt;</button>
    </div>
    <button on:click={() => shuffle(data)}>Shuffle all</button>
  </div>
</main>

<style>
  main {
    background-color: lightgray;
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  .card,
  .card:active {
    margin: 0.5rem auto;
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
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
