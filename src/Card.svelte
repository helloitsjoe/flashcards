<script>
  export let content;

  const ENGLISH = 'english';
  const JAPANESE = 'japanese';

  let side = ENGLISH;

  const flip = () => (side = side === ENGLISH ? JAPANESE : ENGLISH);

  // TODO: Use ResizeObserver, e.g. https://medium.com/@mandy.michael/resize-text-to-fit-the-parent-with-variable-font-width-axis-16921b6687ae
  $: fontSize =
    window.innerWidth < 400 ? `${Math.max(70 / content.length, 10)}vw` : '400%';
</script>

<button style={`font-size: ${fontSize};`} class="content" on:click={flip}>
  {#if !content}
    Start
  {:else}
    {content[side]}
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
