import { render, screen } from '@testing-library/react';
import TenantListItem from './TenantListItem';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';

describe('TenantListItem', () => {
    const mockTenant = {
        id: 'test-tenant-id',
        tenantName: 'Test Tenant',
        admins: [{ id: 'admin-1', name: 'Test Admin 1' }].map((admin) => admin.id),
        users: [{ id: 'user-1', name: 'Test User 1' }].map((user) => user.id),
        categories: ['test-category-1', 'test-category-2'],
        creationDate: 1234567890,
        languages: ['en', 'fr'],
        defaultLanguage: 'en',
    };

    it('renders the tenant name, ID, languages, and number of assigned users', () => {
        render(
            <MemoryRouter>
                <TenantListItem tenant={mockTenant} />
            </MemoryRouter>
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Test Tenant')).toBeInTheDocument();
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('test-tenant-id')).toBeInTheDocument();
        expect(screen.getByText('Languages')).toBeInTheDocument();
        expect(screen.getByText('en, fr')).toBeInTheDocument();
        expect(screen.getByText('Assigned Users')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
     });

    it('renders a GoToTenantButton', () => {
        render(
            <MemoryRouter>
                <TenantListItem tenant={mockTenant} />
            </MemoryRouter>
        );

        expect(screen.getByText('Go to Tenant')).toBeInTheDocument();
    });
});