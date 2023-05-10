import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Category from "../../../types/Category";
import DeleteTextCategoryButton from "./DeleteTextCategoryButton";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { deleteData } from "../../../services/axios/axiosFunctions";


jest.mock('../../../services/axios/axiosFunctions');
jest.mock('../../../hooks/useAuth');


describe('DeleteTextCategoryButton', () => {
  const handleDeleteMock = jest.fn();
  const category: Category = {
    id: 'test category id',
    name: 'test category name',
  };
  const categoryId = 'test category id';

  const authMock = {
    tenant: {
      id: 'tenandId',
    }
  };

  (useAuth as jest.Mock).mockReturnValue(authMock);
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the delete button', () => {
    render(
      <MemoryRouter>
        <DeleteTextCategoryButton handleDelete={handleDeleteMock} category={category} categoryId={categoryId} />
      </MemoryRouter>
    );
  });

  test('opens the dialog when the delete button is clicked', () => {
    render(
      <MemoryRouter>
        <DeleteTextCategoryButton handleDelete={handleDeleteMock} category={category} categoryId={categoryId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', {  name: 'Delete the text category'}));
  });

  test('closes the dialog when the cancel button is clicked', () => {
    render(
      <MemoryRouter>
        <DeleteTextCategoryButton handleDelete={handleDeleteMock} category={category} categoryId={categoryId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', {  name: 'Delete the text category'}));
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
  });

  test('calls the delete function when the delete button is clicked', async () => {
    (deleteData as jest.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <DeleteTextCategoryButton handleDelete={handleDeleteMock} category={category} categoryId={categoryId} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', {  name: 'Delete the text category'}));
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    await waitFor(() => expect(handleDeleteMock).toHaveBeenCalledTimes(1));
    expect(deleteData).toHaveBeenCalledTimes(1);
  });
});