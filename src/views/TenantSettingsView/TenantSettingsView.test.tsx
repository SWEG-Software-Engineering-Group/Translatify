import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import TenantSettingsView from './TenantSettingsView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

test('renders Tenant Settings page', () => {
    render(<BrowserRouter><TenantSettingsView /></BrowserRouter>);
  
    const pageTitle = screen.getByRole('heading', { name: /Tenant.*Settings/i });
    expect(pageTitle).toBeInTheDocument();
  
    const createdOnText = screen.getByText(/Created on/i);
    expect(createdOnText).toBeInTheDocument();
    const tenantIdText = screen.getByText(/TenantId:/i);
    expect(tenantIdText).toBeInTheDocument();
    const defaultLanguageText = screen.getByText(/Default Language:/i);
    expect(defaultLanguageText).toBeInTheDocument();
});

test('renders Admins Info section', () => {
    render(<BrowserRouter><TenantSettingsView /></BrowserRouter>);

    const adminsInfoTitle = screen.getAllByText(/Admin List/i)[0];
    expect(adminsInfoTitle).toBeInTheDocument();
});
  