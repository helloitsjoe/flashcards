<script>
  import { addWord } from './services';
  export let words;
  export let onNewWordAdded;
  console.log('words', words);

  let newWord = '';
  let newTranslation = '';
  let warning = '';
  let submitting = false;

  let token = sessionStorage.getItem('flashcards-token') || '';
  let showTokenInput = !token;
</script>

{#if warning}
  <h2>{warning}</h2>
{/if}

<form
  on:submit|preventDefault={async () => {
    if (newWord in words) {
      warning = `${newWord} already exists!`;
      return;
    }

    warning = '';
    showTokenInput = !token;

    try {
      submitting = true;
      const newWords = await addWord(
        { key: newWord, value: newTranslation },
        token
      );
      onNewWordAdded(newWords);

      showTokenInput = false;
      newWord = '';
      newTranslation = '';
    } catch (err) {
      console.error(err);
    }

    submitting = false;
  }}
  class="new-word-form"
>
  <input placeholder="English word" bind:value={newWord} />
  <input placeholder="Translation" bind:value={newTranslation} />
  {#if showTokenInput}
    <input bind:value={token} />
  {/if}
  <button disabled={!(newWord.length && newTranslation) || submitting}
    >{submitting ? 'Submitting...' : 'Submit'}</button
  >
</form>

<style>
  .new-word-form {
    display: flex;
    flex-direction: column;
  }
</style>
