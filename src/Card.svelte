<script>
  export let content;

  $: console.log(`content.length:`, content.length);
  // TODO: Hacky. Probably won't work for sentences
  $: fontSize = content.length === 1 ? '50vw' : `${100 / content.length}vw`;
</script>

<button style={`font-size: ${fontSize};`} class="content" on:click>
  {#if !content}
    Start
    <!-- {:else if content.match(/https?/)}
    <img src={content} width="100%" height="auto" alt="card" /> -->
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
