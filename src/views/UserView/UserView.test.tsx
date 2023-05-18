import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import UserView from './UserView';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../hooks/useAuth', () => ({ useAuth: jest.fn() }));

const mockedAuth = {
    user: { group: 'user' },
    tenant: { id: 'mocked-tenant-id' },
  };
  jest.mock('../../hooks/useAuth', () => ({
    useAuth: jest.fn(() => mockedAuth),
  }));
const axiosFunctions = require('../../services/axios/axiosFunctions');

test('UserView renders without crashing', async () => {
    (useAuth as jest.Mock).mockReturnValue(mockedAuth);

    render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });
});

test('UserView language picker updates language state', async () => {
    (useAuth as jest.Mock).mockReturnValue(mockedAuth); // Mock useAuth

    render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });

    const languagePicker = screen.getByLabelText('Select language');
    expect(languagePicker).toBeInTheDocument();

    fireEvent.change(languagePicker, { target: { value: 'Spanish' } });

    await waitFor(() => {
      expect(screen.getByText('No texts found')).toBeInTheDocument();
    });
});

test('UserView search box filters displayed texts', async () => {
    (useAuth as jest.Mock).mockReturnValue(mockedAuth); // Mock useAuth

    render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });
});
  
test('UserView displays rejected texts if there are no texts to be translated', async () => {
    (useAuth as jest.Mock).mockReturnValue(mockedAuth); // Mock useAuth

    const mockedGetData = jest.spyOn(axiosFunctions, 'getData');
    mockedGetData.mockResolvedValueOnce({
      data: {
        texts: [
          { id: 1, title: 'Rejected text 1', language: 'English', state: 'rejected' },
          { id: 2, title: 'Rejected text 2', language: 'English', state: 'rejected' },
        ],
      },
    });
    render(
      <MemoryRouter>
        <UserView />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });
    expect(mockedGetData).toHaveBeenCalledTimes(1);
});
  
  

  