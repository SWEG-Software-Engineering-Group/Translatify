import { render, screen } from '@testing-library/react';
import TenantList from './TenantList';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';

const mockTenants = [
  {
    id: 'tenant1',
    tenantName: 'Test Tenant 1',
    admins: ['testadmin1@test.com'],
    users: [],
    categories: [],
    defaultLanguage: 'en',
    creationDate: 123456789,
    languages: ['fr', 'en'],
  },
  {
    id: 'tenant2',
    tenantName: 'Test Tenant 2',
    admins: ['testadmin2@test.com'],
    users: [],
    categories: [],
    defaultLanguage: 'es',
    creationDate: 123456789,
    languages: ['fr', 'en'],
  },
];

describe('TenantList', () => {

  test('renders the tenant list', () => {
    render(<MemoryRouter><TenantList tenants={mockTenants}/></MemoryRouter>);
    const tenantList = screen.getByTestId('tenant-list');
    expect(tenantList).toBeInTheDocument();
    expect(screen.getByText('Tenant List')).toBeInTheDocument();
    expect(screen.getByText('Test Tenant 1')).toBeInTheDocument();
    expect(screen.getByText('Test Tenant 2')).toBeInTheDocument();
  });

    test('renders the tenant list with no tenants', () => {
        render(<MemoryRouter><TenantList tenants={[]}/></MemoryRouter>);
        const tenantList = screen.getByTestId('tenant-list');
        expect(tenantList).toBeInTheDocument();
        expect(screen.getByText('Tenant List')).toBeInTheDocument();
    });

});
