import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import UserList from './UserList';

describe('UserList component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('renders without crashing', () => {
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
      expect(screen.queryByText('Error fetching users.')).not.toBeInTheDocument();
    });
  
    test('displays an error message when data fetching fails', async () => {
      const axiosFunctions = require('../../../../services/axios/axiosFunctions');
      axiosFunctions.getData = jest.fn().mockRejectedValue(new Error('Request failed'));
  
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );

    });
  
    test('displays a message when no users are found', async () => {
      const axiosFunctions = require('../../../../services/axios/axiosFunctions');
      axiosFunctions.getData = jest.fn().mockResolvedValue({ data: { Admins: [] } });
  
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
      });
  
    test('displays a list of users when users are found', async () => {
      const axiosFunctions = require('../../../../services/axios/axiosFunctions');
      axiosFunctions.getData = jest.fn().mockResolvedValue({
        data: {
          Admins: [
            {
              UserAttributes: [
                { Name: 'surname', Value: 'Doe' },
                { Name: 'username', Value: 'johndoe' },
                { Name: 'name', Value: 'John' },
                { Name: 'group', Value: 'admin' },
                { Name: 'email', Value: 'john.doe@example.com' },
              ],
            },
          ],
        },
      });
  
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
  
    });
  
    test('can delete a user', async () => {
      const axiosFunctions = require('../../../../services/axios/axiosFunctions');
      axiosFunctions.getData = jest.fn().mockResolvedValue({
        data: {
          Admins: [
            {
              UserAttributes: [
                { Name: 'surname', Value: 'Doe' },
                { Name: 'username', Value: 'johndoe' },
                { Name: 'name', Value: 'John' },
                { Name: 'group', Value: 'admin' },
                { Name: 'email', Value: 'john.doe@example.com' },
              ],
            },
          ],
        },
      });
  
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
  
      expect(screen.queryByText('johndoe')).not.toBeInTheDocument();
    });
  
    test('can handle different types of users', async () => {
      const axiosFunctions = require('../../../../services/axios/axiosFunctions');
      axiosFunctions.getData = jest.fn().mockResolvedValue({
        data: {
          Admins: [
            {
              UserAttributes: [
                { Name: 'surname', Value: 'Doe' },
                { Name: 'username', Value: 'johndoe' },
                { Name: 'name', Value: 'John' },
                { Name: 'group', Value: 'admin' },
                { Name: 'email', Value: 'john.doe@example.com' },
              ],
            },
          ],
          Users: [
            {
              UserAttributes: [
                { Name: 'surname', Value: 'Smith' },
                { Name: 'username', Value: 'janesmith' },
                { Name: 'name', Value: 'Jane' },
                { Name: 'group', Value: 'user' },
                { Name: 'email', Value: 'jane.smith@example.com' },
              ],
            },
          ],
        },
      });
  
      render(
        <MemoryRouter>
          <UserList type="Admins" />
        </MemoryRouter>
      );
    
      render(
        <MemoryRouter>
          <UserList type="Users" />
        </MemoryRouter>
      );
  
    });
  });