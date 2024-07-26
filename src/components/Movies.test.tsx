// src/components/Movies.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Movies from './Movies';

test('renders Movies component', () => {
  render(<Movies />);
  const element = screen.getByText(/some text that should be in the Movies component/i);
  expect(element).toBeInTheDocument();
});