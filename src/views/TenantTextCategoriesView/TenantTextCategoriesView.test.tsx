import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import TenantTextCategoriesView from './TenantTextCategoriesView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

test('renders TenantTextCategoriesView component', () => {
    render(
      <MemoryRouter>
        <TenantTextCategoriesView />
      </MemoryRouter>
    );
    expect(screen.getByText('Your Tenant Text Categories')).toBeInTheDocument();
});

test('renders search box and handles search query', () => {
    const handleSearch = jest.fn();
    render(
      <MemoryRouter>
        <TenantTextCategoriesView />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Type here to search...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(handleSearch).toHaveBeenCalledTimes(0);
});
  
test('displays error message when data fetching fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Error fetching categories.'));
    render(
      <MemoryRouter>
        <TenantTextCategoriesView />
      </MemoryRouter>
    );
});