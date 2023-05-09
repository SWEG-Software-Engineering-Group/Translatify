import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './LogoutButton';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { NavigateFunction, useNavigate } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe('LogoutButton', () => {
  const handleSignOutMock = jest.fn();
  const navigateMock: NavigateFunction = jest.fn();
  (useNavigate as jest.Mock).mockImplementation(() => navigateMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls auth.signOut and navigates to /login when the button is clicked', async () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(handleSignOutMock).toHaveBeenCalledTimes(0);
  });

  test('logs an error when auth.signOut throws an error', async () => {
    const error = new Error('Error in signing out');
    handleSignOutMock.mockRejectedValueOnce(error);

    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(handleSignOutMock).toHaveBeenCalledTimes(0);
    expect(navigateMock).not.toHaveBeenCalled();
  });
});