import { fireEvent, render, screen } from '@testing-library/svelte';
import Cards from '../Cards.svelte';

describe('Cards.svelte', () => {
  it('moves to next card if next button is pressed', async () => {
    render(Cards, {
      groups: [
        { english: 'Foo', japanese: '車' },
        { english: 'Bar', japanese: '車車' },
      ],
      shuffleCards() {},
      removeCard() {},
    });
    expect(screen.queryByText(/foo/i)).toBeTruthy();
    expect(screen.queryByText(/bar/i)).not.toBeTruthy();
    await fireEvent.click(screen.queryByText('>'));
    expect(screen.queryByText(/foo/i)).not.toBeTruthy();
    expect(screen.queryByText(/bar/i)).toBeTruthy();
  });
});
