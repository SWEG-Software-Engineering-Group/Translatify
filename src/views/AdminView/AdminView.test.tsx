import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import AdminView from './AdminView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

test('renders the "Admin Dashboard" title', () => {
    render(
      <BrowserRouter>
        <AdminView />
      </BrowserRouter>
    );
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
});

test('renders all four cards', () => {
    render(
      <BrowserRouter>
        <AdminView />
      </BrowserRouter>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Texts')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
});

test('clicking on the "Go To Tenant Settings" button navigates to the correct page', async () => {
    render(
      <BrowserRouter>
        <AdminView />
      </BrowserRouter>
    );
    fireEvent.click(screen.getAllByText('Go To Tenant Settings')[0]);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/TenantSettings');
    });
});
