import { screen, fireEvent, render, waitFor} from "@testing-library/react";
import Tenant from "../../../types/Tenant";
import { MemoryRouter, useParams } from "react-router-dom";
import DeleteTenantButton from "./DeleteTenantButton";
import { deleteData } from "../../../services/axios/axiosFunctions";

jest.mock('../../../services/axios/axiosFunctions');


describe('DeleteTenantButton', () => {
  const handleDeleteMock = jest.fn();
  const tenant: Tenant = {
    id: 'tenant1',
    tenantName: 'Test Tenant 1',
    admins: ['testadmin1@test.com'],
    users: [],
    categories: [],
    defaultLanguage: 'en',
    creationDate: 123456789,
    languages: ['fr', 'en']
  };
  const tenantId = 'tenant1';



  test('renders the delete button', () => {
    render(
      <MemoryRouter>
        <DeleteTenantButton handleDelete={handleDeleteMock} tenant={tenant} tenantId={tenantId}  />
      </MemoryRouter>
    );
  });

  test('opens the dialog when the delete button is clicked', () => {
    render(
      <MemoryRouter>
        <DeleteTenantButton handleDelete={handleDeleteMock} tenant={tenant} tenantId={tenantId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: `Delete ${tenant.tenantName}`}));
  });

  test('closes the dialog when the cancel button is clicked', () => {
    render(
      <MemoryRouter>
        <DeleteTenantButton handleDelete={handleDeleteMock} tenant={tenant} tenantId={tenantId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: `Delete ${tenant.tenantName}`}));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel'}));
  });

  test('calls the handleDelete function when the delete button is clicked', async () => {
    (deleteData as jest.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <DeleteTenantButton handleDelete={handleDeleteMock} tenant={tenant} tenantId={tenantId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: `Delete ${tenant.tenantName}`}));
    fireEvent.click(screen.getByRole('button', { name: 'Yes'}));
    await waitFor(() => expect(deleteData).toHaveBeenCalledTimes(1));
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  });
});