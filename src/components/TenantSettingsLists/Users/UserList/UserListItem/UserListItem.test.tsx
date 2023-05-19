import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import UserListItem from './UserListItem';

jest.mock('../../../../../services/axios/axiosFunctions');

const mockUser = {
  username: 'testuser',
  password: 'testpassword',
  name: 'Test',
  surname: 'User',
  email: 'testuser@test.com',
  group: 'testgroup',
};

describe('UserListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays user information', () => {
    render(<UserListItem user={mockUser} handleDelete={() => {}} />);
    expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Surname: ${mockUser.surname}`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Role: ${mockUser.group}`)).toBeInTheDocument();
  });

  test('opens delete confirmation dialog on delete button click', () => {
    render(<UserListItem user={mockUser} handleDelete={() => {}} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText(`Are you sure you want to delete user ${mockUser.username}?`)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('closes delete confirmation dialog on cancel button click', () => {
    render(<UserListItem user={mockUser} handleDelete={() => {}} />);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Cancel'));
  });

  test('calls handleDelete and closes dialog on delete confirmation', async () => {
    const handleDeleteMock = jest.fn();
    render(<UserListItem user={mockUser} handleDelete={handleDeleteMock} />);
    fireEvent.click(screen.getByText('Delete'));
  });
});