<script>
  const data = [
    ['Start', 'Start'],
    ['a', 'あ'],
    ['e', 'え'],
    ['i', 'い'],
    ['o', 'お'],
    ['u', 'う'],
    ['ka', 'か'],
    ['ke', 'け'],
    ['ki', 'き'],
    ['ko', 'こ'],
    ['ku', 'く'],
    ['ga', 'が'],
    ['ge', 'げ'],
    ['gi', 'ぎ'],
    ['go', 'ご'],
    ['gu', 'ぐ'],
    ['n', 'ん'],
  ];

  // let remaining = [...data];
  let currentIdx = 0;
  let side = 0;

  $: content = data[currentIdx][side];

  const flip = () => {
    side = side === 0 ? 1 : 0;
  };

  const getNext = () => {
    currentIdx = currentIdx + 1 > data.length - 1 ? 0 : currentIdx + 1;
  };

  const getPrev = () => {
    currentIdx = currentIdx - 1 < 0 ? data.length - 1 : currentIdx - 1;
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
