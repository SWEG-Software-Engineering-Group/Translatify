import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import AdminList from './AdminList';

// Mock the useAuth hook to return a fake tenant
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: () => ({
    tenant: {
      id: 'fakeTenantId'
    }
  })
}));

// Mock the axiosFunctions module to return fake data
jest.mock('../../../../services/axios/axiosFunctions', () => ({
  getData: () => Promise.resolve({
    data: {
      Admins: [{
        UserAttributes: [
          { Value: 'Doe' },
          { Value: 'jdoe' },
          { Value: 'John' },
          { Value: 'admin' },
          { Value: 'jdoe@example.com' }
        ]
      }]
    }
  })
}));

describe('AdminList', () => {
  it('should display a list of admins when admins are found', async () => {
    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

    // Wait for the component to finish rendering
    const admins = await screen.findAllByText(/jdoe/);

    expect(admins.length).toBe(2);
  });

  it('should display an error message when there is an error fetching admins', async () => {
    // Mock the axiosFunctions module to return an error
    jest.mock('../../../../services/axios/axiosFunctions', () => ({
      getData: () => Promise.reject(new Error('Fake error'))
    }));

    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

  });

  it('should display a "No admins found" message when no admins are found', async () => {
    // Mock the axiosFunctions module to return empty data
    jest.mock('../../../../services/axios/axiosFunctions', () => ({
      getData: () => Promise.resolve({
        data: {
          Admins: []
        }
      })
    }));

    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

  });
});
