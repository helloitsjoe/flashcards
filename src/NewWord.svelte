<script>
  import { addWordLocal } from './services';
  export let words;
  export let onNewWordAdded;

  let newWord = '';
  let newTranslation = '';
  let warning = '';
  let submitting = false;

  // let token = sessionStorage.getItem('flashcards-token') || '';
  // let showTokenInput = !token;

  let handleFormSubmit = async () => {
    if (newWord in words) {
      warning = `${newWord} already exists!`;
      return;
    }

    warning = '';
    // showTokenInput = !token;

    submitting = true;
    const newWords = { ...words, [newWord]: newTranslation };
    addWordLocal(newWords);
    onNewWordAdded(newWords);

    // showTokenInput = false;
    newWord = '';
    newTranslation = '';
    submitting = false;
  };
</script>

{#if warning}
  <h2>{warning}</h2>
{/if}

<form on:submit|preventDefault={handleFormSubmit} class="new-word-form">
  <input placeholder="English word" bind:value={newWord} />
  <input placeholder="Translation" bind:value={newTranslation} />
  <!-- {#if showTokenInput}
    <input bind:value={token} />
  {/if} -->
  <button
    class="submit"
    disabled={!(newWord.length && newTranslation) || submitting}
    >{submitting ? 'Submitting...' : 'Submit'}</button
  >
</form>

<style>
  .new-word-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
  }

  .submit {
    padding: 0.5em;
  }
</style>
