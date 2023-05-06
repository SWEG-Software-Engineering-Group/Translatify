import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryInput from './CategoryInput';

const onChangeMock = jest.fn();

describe('CategoryInput', () => {
    beforeEach(() => {
        onChangeMock.mockClear();
    });

   test('displays the provided categories in the Autocomplete', () => {

        render(<CategoryInput onChange={onChangeMock} />);
        const autocompleteInput = screen.getByLabelText('Category input');

        fireEvent.focus(autocompleteInput);

    });

    test('fails to display the provided categories in the Autocomplete when options are not found', () => {
        render(<CategoryInput onChange={onChangeMock} />);
        const autocompleteInput = screen.getByLabelText('Category input');

        fireEvent.focus(autocompleteInput);

        const nonExistingCategory = 'Non-existing category';
        const option = screen.queryAllByRole('option').find((element) => {
            return element.textContent === nonExistingCategory;
        });
        expect(option).toBeUndefined();
    });

    test('adds a new category through the confirmation dialog', async () => {
        const newCategory = 'newCategory';
        render(<CategoryInput onChange={onChangeMock} />);

        const autocompleteInput = screen.getByLabelText('Category input');
        fireEvent.change(autocompleteInput, { target: { value: newCategory } });
        fireEvent.keyDown(autocompleteInput, { key: 'Enter' });

        await waitFor(() => {
            expect(screen.getByText('Add a new category')).toBeInTheDocument();
        });

        const dialogInput = screen.getByLabelText('category');
        fireEvent.change(dialogInput, { target: { value: newCategory } });
        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(onChangeMock).toHaveBeenCalledWith(newCategory);
    });

    test('cancels adding a new category through the confirmation dialog', async () => {
        const newCategory = 'newCategory';
        render(<CategoryInput onChange={onChangeMock} />);

        const autocompleteInput = screen.getByLabelText('Category input');
        fireEvent.change(autocompleteInput, { target: { value: newCategory } });
        fireEvent.keyDown(autocompleteInput, { key: 'Enter' });

        await waitFor(() => {
            expect(screen.getByText('Add a new category')).toBeInTheDocument();
        });

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(onChangeMock).toHaveBeenCalledWith('');
    });

    test('resets the selected category when clearing the input', () => {
        render(<CategoryInput onChange={onChangeMock} previousCategory="header" />);

        const autocompleteInput = screen.getByLabelText('Category input');

        fireEvent.change(autocompleteInput, { target: { value: '' } });
        expect(onChangeMock).toHaveBeenCalledWith('');
  });
});