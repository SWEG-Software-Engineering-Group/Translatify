import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import ReviewTextsView from './ReviewTextsView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: { group: 'admin' },
    tenant: { id: 'mock-tenant-id', defaultLanguage: 'en' },
  })),
}));

// Mock the axiosFunctions module
jest.mock('../../services/axios/axiosFunctions', () => ({
  getData: jest.fn(),
}));

describe('ReviewTestsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render ReviewTextsView', async () => {
    render(
      <MemoryRouter>
        <ReviewTextsView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your Tenant Review Texts')).toBeInTheDocument();
    });
  });
});
