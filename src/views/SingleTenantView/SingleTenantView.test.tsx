import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SingleTenantView from './SingleTenantView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('SingleTenantView', () => {
  test('renders SingleTenantView without crashing', () => {
    render(
      <MemoryRouter initialEntries={[`/tenant/valid-id`]}>
        <Routes>
          <Route path="/tenant/:id" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('redirects to /SuperAdmin if id is not defined', () => {
    render(
      <MemoryRouter initialEntries={[`/tenant`]}>
        <Routes>
          <Route path="/tenant" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('displays an error message if tenant data is not found', () => {
    const mockGetData = jest.fn(() => Promise.reject());
    jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));

    render(
      <MemoryRouter initialEntries={[`/tenant/invalid-id`]}>
        <Routes>
          <Route path="/tenant/:id" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockGetData).toHaveBeenCalledTimes(0);
  });

  test('displays the tenant name and creation date if tenant data is found', async () => {
    const mockGetData = jest.fn(() => Promise.resolve({ data: { tenant: { tenantName: 'Test Tenant', creationDate: '2022-05-13T14:30:00.000Z' } } }));
    jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));

    render(
      <MemoryRouter initialEntries={[`/tenant/valid-id`]}>
        <Routes>
          <Route path="/tenant/:id" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockGetData).toHaveBeenCalledTimes(0);
  });

  test('displays the add admin and add user buttons', async () => {
    const mockGetData = jest.fn(() => Promise.resolve({ data: { tenant: { tenantName: 'Test Tenant' } } }));
    jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));

    render(
      <MemoryRouter initialEntries={[`/tenant/valid-id`]}>
        <Routes>
          <Route path="/tenant/:id" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockGetData).toHaveBeenCalledTimes(0);

    expect(screen.getByText('Add Admin')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('clicking the add admin button navigates to the create user page with the correct URL', async () => {
    const mockGetData = jest.fn(() => Promise.resolve({ data: { tenant: { tenantName: 'Test Tenant' } } }));
    jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate }));

    render(
      <MemoryRouter initialEntries={[`/tenant/valid-id`]}>
        <Routes>
          <Route path="/tenant/:id" element={<SingleTenantView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockGetData).toHaveBeenCalledTimes(0);

    const addAdminButton = screen.getByText('Add Admin');
    fireEvent.click(addAdminButton);
  });
});