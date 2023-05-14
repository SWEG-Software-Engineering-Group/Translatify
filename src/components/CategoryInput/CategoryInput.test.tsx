import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryInput from './CategoryInput';
import React from 'react';

test('renders without crashing', () => {
    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="food" />);
});

test('default category is selected when no previous category is provided', () => {
    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="food" />);
    const categoryInput = screen.getByLabelText('Category input');
    expect(categoryInput).toHaveValue('food');
});

test('previous category is selected when provided', () => {
    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="drinks" />);
    const categoryInput = screen.getByLabelText('Category input');
    expect(categoryInput).toHaveValue('drinks');
});

test('selecting existing category calls onChange with selected category', () => {
    const onChangeMock = jest.fn();

    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="food" />);
    const categoryInput = screen.getByLabelText('Category input');
    fireEvent.change(categoryInput, { target: { value: 'drinks' }});
    const drinksOption = screen.getByText('drinks');
    
    fireEvent.click(drinksOption);
    expect(onChangeMock).toHaveBeenCalledTimes(0);
});

test('typing new category and submitting calls onChange with new category', async () => {
    const onChangeMock = jest.fn();
    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="food" />);

    const categoryInput = screen.getByLabelText('Category input');
    fireEvent.change(categoryInput, { target: { value: 'new category' }});
    const addNewCategoryOption = screen.getByText('Add "new category"');

    fireEvent.click(addNewCategoryOption);
    const dialogAddButton = screen.getByText('Add');
    fireEvent.click(dialogAddButton);

    await waitFor(() => expect(screen.queryByText('Add a new category')).not.toBeInTheDocument());

    expect(onChangeMock).toHaveBeenCalledTimes(0);
});

test('cancelling the dialog sets selected category to default category and calls onChange with default category', async () => {
    const onChangeMock = jest.fn();
    render(<CategoryInput onChange={() => {}} categories={['food', 'drinks']} previousCategory="food" />);
    const categoryInput = screen.getByLabelText('Category input');

    fireEvent.change(categoryInput, { target: { value: 'new category' }});
    const addNewCategoryOption = screen.getByText('Add "new category"');

    fireEvent.click(addNewCategoryOption);
    const dialogCancelButton = screen.getByText('Cancel');

    fireEvent.click(dialogCancelButton);
    await waitFor(() => expect(screen.queryByText('Add a new category')).not.toBeInTheDocument());

    expect(categoryInput).toHaveValue('new category');
    expect(onChangeMock).toHaveBeenCalledTimes(0);
});