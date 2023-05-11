import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import LoginView from './LoginView';

describe('LoginView', () => {
  test('should render LoginView', async () => {
    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );
  });
});