<script>
  export let content;
  $: console.log('content', content);
</script>

<button class="content" on:click>
  {#if !content}
    Start
    <!-- {:else if content.match(/https?/)}
    <img src={content} width="100%" height="auto" alt="card" /> -->
  {:else}
    {@html content}
  {/if}
</button>

<style>
  .content,
  .content:active {
    font-size: 35vw;
    padding: 0;
    margin: 2.5rem;
    background: none;
    border: none;
  }
</style>
