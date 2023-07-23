import onSwipe, { Directions } from 'swipey';
import words from './data/words.json';
import App from './App.svelte';

// Pull to refresh
onSwipe(Directions.DOWN, () => window.location.reload(), {
  fromTop: true,
});

const app = new App({
  target: document.body,
  props: {
    words,
  },
});

export default app;
