<script>
  export let content;

  // TODO: Use ResizeObserver, e.g. https://medium.com/@mandy.michael/resize-text-to-fit-the-parent-with-variable-font-width-axis-16921b6687ae
  $: fontSize =
    window.innerWidth < 440 ? `${Math.max(70 / content.length, 10)}vw` : '400%';
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
    margin: 2.5rem 1rem;
    background: none;
    border: none;
  }
</style>
