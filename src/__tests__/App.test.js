import { render, screen } from '@testing-library/svelte';
import App from '../App.svelte';

describe('App.svelte', () => {
  it('renders Hello with `name` prop', () => {
    render(App);
    expect(screen.queryByText(/start/i)).toBeTruthy();
  });
});
