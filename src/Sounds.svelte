<script>
  export let data;
  export let startGame;
  export let clearCategory;

  let pendingSounds = [];
  $: console.log(pendingSounds);

  const addGroup = e => {
    const { value } = e.target;

    if (pendingSounds[value]) {
      pendingSounds = pendingSounds.filter(g => g !== value);
    } else {
      pendingSounds = [...pendingSounds, value];
    }
  };

  const addAllGroups = () => {
    if (pendingSounds.length === Object.keys(data).length) {
      pendingSounds = [];
    } else {
      pendingSounds = Object.keys(data);
    }
  };

  const start = () => {
    // For now just put all sounds in a single array
    const temp = [];
    for (const pending of pendingSounds) {
      temp.push(data[pending]);
    }
    startGame(temp);
  };
</script>

<fieldset class="sounds">
  {#each Object.keys(data) as sound}
    <label>
      <input
        type="checkbox"
        value={sound}
        checked={pendingSounds.includes(sound)}
        on:change={addGroup}
      />
      {sound.toUpperCase()}</label
    >
  {/each}
  <label>
    <input
      type="checkbox"
      checked={pendingSounds.length === Object.keys(data).length}
      on:change={addAllGroups}
    />
    All</label
  >
</fieldset>
<div class="group">
  <button on:click={clearCategory}>Back</button>
  <button on:click={start}>Start</button>
</div>

<style>
  .sounds {
    margin: 1em;
    font-size: 2em;
    display: grid;
    grid-template-columns: repeat(3, 2.5em);
  }

  .group {
    display: flex;
  }
</style>
