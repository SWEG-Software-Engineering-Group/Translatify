import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginView from './LoginView';
import React from 'react';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('LoginView', () => {
  test('should render LoginView', async () => {
    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );
  });

  test('form submits with correct values', () => {
    const mockSignIn = jest.fn();
    const mockUseAuth = jest.fn(() => ({ signIn: mockSignIn }));
    jest.mock('../../hooks/useAuth', () => ({ useAuth: mockUseAuth }));

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
  });

  test('shows error message on failed login', async () => {
    const mockSignIn = jest.fn(() => ({ success: false, message: 'Invalid credentials' }));
    const mockUseAuth = jest.fn(() => ({ signIn: mockSignIn }));
    jest.mock('../../hooks/useAuth', () => ({ useAuth: mockUseAuth }));

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
  });

  test('redirects to home page on successful login', async () => {
    const mockSignIn = jest.fn(() => ({ success: true }));
    const mockNavigate = jest.fn();
    const mockUseAuth = jest.fn(() => ({ signIn: mockSignIn, isAuthenticated: true }));
    jest.mock('../../hooks/useAuth', () => ({ useAuth: mockUseAuth }));
    jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate }));

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
  });
});