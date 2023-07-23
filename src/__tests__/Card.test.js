import { render, screen, fireEvent } from '@testing-library/svelte';
import Card from '../Card.svelte';

describe('Card.svelte', () => {
  it('renders Start if content is empty', () => {
    render(Card, { content: null });
    expect(screen.queryByText(/start/i)).toBeTruthy();
  });

  it('renders content if content is NOT empty', () => {
    render(Card, { content: { english: 'Foo', japanese: '車' } });
    expect(screen.queryByText(/foo/i)).toBeTruthy();
    expect(screen.queryByText(/start/i)).not.toBeTruthy();
  });

  it('flips content when clicked', async () => {
    render(Card, { content: { english: 'Foo', japanese: '車' } });
    expect(screen.queryByText(/foo/i)).toBeTruthy();
    expect(screen.queryByText('車')).not.toBeTruthy();
    await fireEvent.click(screen.queryByText(/foo/i));
    expect(screen.queryByText(/foo/i)).not.toBeTruthy();
    expect(screen.queryByText('車')).toBeTruthy();
    await fireEvent.click(screen.queryByText('車'));
    expect(screen.queryByText(/foo/i)).toBeTruthy();
    expect(screen.queryByText('車')).not.toBeTruthy();
  });
});
