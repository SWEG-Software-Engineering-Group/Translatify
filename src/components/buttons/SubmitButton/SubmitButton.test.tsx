import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

//test component with corret text is rendered
test('renders SubmitButton component with correct text', () => {
    render(<SubmitButton handleSubmit={()=>{}} value="Submit" />);
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();
});

//test onClick event is called correctly when button is clicked
test('onClick function is called on button click', () => {
    const handleSubmit = jest.fn(); //mock function
    render(<SubmitButton handleSubmit={handleSubmit} value="Submit" />); //render component with mock function
    const submitButton = screen.getByRole('button', {name: 'Submit'}); //get button
    fireEvent.click(submitButton); //click button
    expect(handleSubmit).toHaveBeenCalledTimes(1); //check mock function is called exactly once
});

//test handleSubmit event is called correctly when form is submitted (similar logic)
test('handleSubmit function is called on form submit', () => {
    const handleSubmit = jest.fn();
    render(
        <form onSubmit={handleSubmit}>
        <SubmitButton handleSubmit={()=>{}} value="Submit" />
        </form>
    );
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
});