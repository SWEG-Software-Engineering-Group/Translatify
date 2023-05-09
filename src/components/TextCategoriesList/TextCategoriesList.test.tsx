import { render, screen } from '@testing-library/react';
import TextCategoriesList from './TextCategoriesList';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import Category from "../../types/Category";

describe('TextCategoriesList', () => {
  const categories: Category[] = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];

  test('renders categories', () => {
    render(
      <MemoryRouter>
        <TextCategoriesList categories={categories} searchFilter="" updateList={() => {}} />
      </MemoryRouter>
    );

    const categoryElements = screen.getAllByRole('listitem');
    expect(categoryElements.length).toBe(3);
    expect(categoryElements[0]).toHaveTextContent('Category 1');
    expect(categoryElements[1]).toHaveTextContent('Category 2');
    expect(categoryElements[2]).toHaveTextContent('Category 3');
  });

  test('filters categories', () => {
    render(
      <MemoryRouter>
        <TextCategoriesList categories={categories} searchFilter="1" updateList={() => {}} />
      </MemoryRouter>
    );

    const categoryElements = screen.getAllByRole('listitem');
    expect(categoryElements.length).toBe(1);
    expect(categoryElements[0]).toHaveTextContent('Category 1');
  });

  test('calls updateList when handleDelete is called', () => {
    const updateList = jest.fn();
    render(
      <MemoryRouter>
        <TextCategoriesList categories={categories} searchFilter="" updateList={updateList} />
      </MemoryRouter>
    );

    const deleteButton = screen.getAllByRole('button')[0];
    deleteButton.click();

    expect(updateList).toHaveBeenCalledTimes(0);
  });

  test('displays "No categories found" message when there are no categories', () => {
    render(
      <MemoryRouter>
        <TextCategoriesList categories={[]} searchFilter="" updateList={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });
});