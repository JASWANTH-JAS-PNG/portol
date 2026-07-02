import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app brand in the navbar', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/portol/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
