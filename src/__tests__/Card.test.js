import { render, screen } from '@testing-library/svelte';
import Card from '../Card.svelte';

describe('Card.svelte', () => {
  it('renders Start if content is empty', () => {
    render(Card, { content: '' });
    expect(screen.queryByText(/start/i)).toBeTruthy();
  });

  it('renders content if content is NOT empty', () => {
    render(Card, { content: 'Foo' });
    expect(screen.queryByText(/foo/i)).toBeTruthy();
    expect(screen.queryByText(/start/i)).not.toBeTruthy();
  });

  it('renders image if content includes http', () => {
    render(Card, { content: 'http://foo.com' });
    expect(screen.queryByText(/foo/i)).not.toBeTruthy();
    expect(screen.queryByText(/start/i)).not.toBeTruthy();
    expect(screen.queryByAltText(/card/i).src).toBe('http://foo.com/');
  });
});
