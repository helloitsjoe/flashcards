import { fireEvent, render, screen } from '@testing-library/svelte';
import App from '../App.svelte';

describe('App.svelte', () => {
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
