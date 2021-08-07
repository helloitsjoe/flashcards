<script>
  export let content;

  // TODO: Make this less hacky
  $: fontSize = content.length === 1 ? '50vw' : `${70 / content.length}vw`;
</script>

<button style={`font-size: ${fontSize};`} class="content" on:click>
  {#if !content}
    Start
  {:else}
    {content}
  {/if}
</button>

<style>
  .content,
  .content:active {
    height: 50vh;
    padding: 0;
    margin: 2.5rem 0;
    background: none;
    border: none;
  }
</style>
