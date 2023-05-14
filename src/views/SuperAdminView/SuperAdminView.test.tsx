import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SuperAdminView from './SuperAdminView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

test('renders SuperAdminView component', () => {
    render(
      <MemoryRouter>
        <SuperAdminView />
      </MemoryRouter>
    );
});

test('renders SearchBox component', () => {
    render(
      <MemoryRouter>
        <SuperAdminView />
      </MemoryRouter>
    );
    const searchBox = screen.getByRole('textbox');
    expect(searchBox).toBeInTheDocument();
});

test('handleSearch filters tenants list based on query', () => {
    render(
      <MemoryRouter>
        <SuperAdminView />
      </MemoryRouter>
    );
    const searchBox = screen.getByRole('textbox');
    fireEvent.change(searchBox, { target: { value: 'tenant 1' } });
});

test('displays "No tenants found" message when filtered tenants list is empty', () => {
    render(
        <MemoryRouter>
          <SuperAdminView />
        </MemoryRouter>
      );
      const searchBox = screen.getByRole('textbox');
    fireEvent.change(searchBox, { target: { value: 'No tenant with this name' } });
    const noTenantsFoundMessage = screen.getByText('No tenants found');
    expect(noTenantsFoundMessage).toBeInTheDocument();
});
  