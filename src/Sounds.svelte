<script>
  export let data;
  export let startGame;

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
</fieldset>
<button on:click={start}>Start</button>

<style>
  .sounds {
    margin: 1em;
    font-size: 2em;
    display: grid;
    grid-template-columns: repeat(3, 2.5em);
  }
</style>
