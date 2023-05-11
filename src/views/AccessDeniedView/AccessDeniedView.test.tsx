import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AccessDeniedView from './AccessDeniedView';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

describe('AccessDeniedView', () => {
  test('should render AccessDeniedView', async () => {
    render(
      <MemoryRouter>
        <AccessDeniedView />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /you don't have access rights/i });
    const link = screen.getByRole('link', { name: /here/i });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
});
