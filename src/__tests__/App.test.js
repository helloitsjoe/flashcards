import { fireEvent, render, screen } from '@testing-library/svelte';
import App from '../App.svelte';

describe('App.svelte', () => {
  describe('cards', () => {
    it('renders cards by default', () => {
      render(App, { props: { words: { car: '車' } } });
      expect(screen.queryByText(/hiragana/i)).not.toBeTruthy();
      expect(screen.queryByText(/katakana/i)).not.toBeTruthy();
      expect(screen.queryByText(/car/i)).toBeTruthy();
    });

    it('shows and hides new word form', async () => {
      render(App, { props: { words: { car: '車' } } });
      expect(screen.queryByPlaceholderText(/english/i)).not.toBeTruthy();
      expect(screen.queryByPlaceholderText(/japanese/i)).not.toBeTruthy();
      expect(screen.queryByPlaceholderText(/submit/i)).not.toBeTruthy();
      await fireEvent.click(screen.queryByText('+'));
      expect(screen.queryByPlaceholderText(/english/i)).toBeTruthy();
      expect(screen.queryByPlaceholderText(/japanese/i)).toBeTruthy();
      expect(screen.queryByText(/submit/i)).toBeTruthy();
      await fireEvent.click(screen.queryByText('-'));
      expect(screen.queryByPlaceholderText(/english/i)).not.toBeTruthy();
      expect(screen.queryByPlaceholderText(/japanese/i)).not.toBeTruthy();
      expect(screen.queryByText(/submit/i)).not.toBeTruthy();
    });

    it('allows for adding new words', async () => {
      render(App, { props: { words: { car: '車' } } });
      await fireEvent.click(screen.queryByText('+'));
      await fireEvent.input(screen.queryByPlaceholderText(/english/i), {
        target: { value: 'house' },
      });
      await fireEvent.input(screen.queryByPlaceholderText(/japanese/i), {
        target: { value: '家' },
      });
      await fireEvent.click(screen.queryByText(/submit/i));
      expect(screen.queryByText(/house/i)).toBeTruthy();
    });
  });

  xdescribe('hiragana/katakana', () => {
    it('renders category choices', () => {
      render(App);
      expect(screen.queryByText(/hiragana/i)).toBeTruthy();
      expect(screen.queryByText(/katakana/i)).toBeTruthy();
    });

    it('renders sound choices after hiragana is selected', async () => {
      render(App);
      await fireEvent.click(screen.queryByText(/hiragana/i));

      await screen.findByText(/start/i);

      expect(screen.getByLabelText('A')).toBeTruthy();
      expect(screen.getByLabelText('K')).toBeTruthy();
      expect(screen.getByLabelText('S')).toBeTruthy();
      expect(screen.getByLabelText('All')).toBeTruthy();
    });

    it('renders sound choices after katakana is selected', async () => {
      render(App);
      await fireEvent.click(screen.queryByText(/katakana/i));

      await screen.findByText(/start/i);

      expect(screen.getByLabelText('A')).toBeTruthy();
      expect(screen.getByLabelText('K')).toBeTruthy();
      expect(screen.getByLabelText('S')).toBeTruthy();
      expect(screen.getByLabelText('All')).toBeTruthy();
    });
  });
});
