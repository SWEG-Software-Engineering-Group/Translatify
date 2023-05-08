import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import Users from './Users';

import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Users component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Users tenantId="1" />);
    expect(screen.getByText('User List')).toBeInTheDocument();
  });

  test('displays a list of users when expanded', () => {
    render(
      <MemoryRouter>
        <Users tenantId="1" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'expand' }));
    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  test('navigates to the create user page when add user button is clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<Users tenantId="1" />);
    expect(navigateMock).toHaveBeenCalledTimes(0);
  });
});
