import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import AdminListItem from './AdminListItem';

test('renders AdminListItem component', () => {
    const admin = {
        username: 'admin1',
        name: 'John',
        surname: 'Doe',
        email: 'admin1@example.com',
        group: 'admin',
        password: 'password',
    };
    render(
      <MemoryRouter>
        <AdminListItem admin={admin} />
      </MemoryRouter>
    );
});

test('displays admin information correctly', () => {
    const admin = {
      username: 'admin1',
      name: 'John',
      surname: 'Doe',
      email: 'admin1@example.com',
      group: 'admin',
      password: 'password',
    };

    render(
      <MemoryRouter>
        <AdminListItem admin={admin} />
      </MemoryRouter>
    );

    const username = screen.getByText(`Username: ${admin.username}`);
    const name = screen.getByText(`Name: ${admin.name}`);
    const surname = screen.getByText(`Surname: ${admin.surname}`);
    const email = screen.getByText(`Email: ${admin.email}`);
    const role = screen.queryByText(`Role: ${admin.group}`);
    expect(username).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(surname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(role).toBeNull();
});

test('displays admin information and role correctly for admin user', () => {
    const admin = {
        username: 'admin1',
        name: 'John',
        surname: 'Doe',
        email: 'admin1@example.com',
        group: 'admin',
        password: 'password',
    };
    render(
      <MemoryRouter>
        <AdminListItem admin={admin} isAdmin />
      </MemoryRouter>
    );
    const username = screen.getByText(`Username: ${admin.username}`);
    const name = screen.getByText(`Name: ${admin.name}`);
    const surname = screen.getByText(`Surname: ${admin.surname}`);
    const email = screen.getByText(`Email: ${admin.email}`);
    const role = screen.getByText(`Role: ${admin.group}`);
    expect(username).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(surname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(role).toBeInTheDocument();
});

test('displays admin information correctly for non-admin user', () => {
    const admin = {
        username: 'admin1',
        name: 'John',
        surname: 'Doe',
        email: 'admin1@example.com',
        group: 'admin',
        password: 'password',
    };
    render(
      <MemoryRouter>
        <AdminListItem admin={admin} />
      </MemoryRouter>
    );
    const username = screen.getByText(`Username: ${admin.username}`);
    const name = screen.getByText(`Name: ${admin.name}`);
    const surname = screen.getByText(`Surname: ${admin.surname}`);
    const email = screen.getByText(`Email: ${admin.email}`);
    const role = screen.queryByText(`Role: ${admin.group}`);
    expect(username).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(surname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(role).toBeNull();
});
  
  
  
  