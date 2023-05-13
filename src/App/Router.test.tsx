import React from 'react';
import { render } from '@testing-library/react';
import Router from './Router';

test('renders Router component without crashing', () => {
  render(<Router />);
});
