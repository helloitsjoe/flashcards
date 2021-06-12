<script>
  const data = [
    ['Start', 'Start'],
    ['a', 'あ'],
    ['i', 'い'],
    ['e', 'え'],
    ['o', 'お'],
    ['u', 'う'],
  ];

  // let remaining = [...data];
  let currentIdx = 0;
  let side = 0;

  const flip = () => {
    side = side === 0 ? 1 : 0;
  };

  const getNext = () => {
    currentIdx = currentIdx + 1 > data.length - 1 ? 0 : currentIdx + 1;
    side = 0;
  };

  const getPrev = () => {
    currentIdx = currentIdx - 1 < 0 ? data.length - 1 : currentIdx - 1;
    side = 0;
  };
</script>

<main>
  <div class="card" on:click={flip}>
    <p class="text">
      {data[currentIdx][side]}
    </p>
    <div>
      <button class="direction" on:click={getPrev}>&lt;-</button>
      <button class="direction" on:click={getNext}>-&gt;</button>
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
    font-size: 5em;
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

  .text {
    margin: 2.5em;
  }

  .direction {
    border: none;
    background: none;
  }
</style>
