import { render, screen } from '@testing-library/react';
import TextCategoriesListItem from './TextCategoriesListItem';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import Category from "../../../types/Category";

describe('TextCategoriesListItem', () => {
    const category: Category = { id: '1', name: 'Category 1' };
    const handleDeleteFromList = jest.fn();
  
    test('renders category name', () => {
      render(
        <MemoryRouter>
          <TextCategoriesListItem category={category} handleDeleteFromList={handleDeleteFromList} />
        </MemoryRouter>
      );
  
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Category 1')).toBeInTheDocument();
    });
  
    test('calls handleDeleteFromList when delete button is clicked', () => {
      render(
        <MemoryRouter>
          <TextCategoriesListItem category={category} handleDeleteFromList={handleDeleteFromList} />
        </MemoryRouter>
      );
  
      const deleteButton = screen.getByRole('button');
      deleteButton.click();
  
      expect(handleDeleteFromList).toHaveBeenCalledTimes(0);
    });
});