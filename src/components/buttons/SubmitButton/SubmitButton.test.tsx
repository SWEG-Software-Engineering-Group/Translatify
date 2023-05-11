import { fireEvent, render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

test('renders SubmitButton component with correct text', () => {
    render(<SubmitButton handleSubmit={()=>{}} value="Submit" />);
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();
});

test('onClick function is called on button click', () => {
    const handleSubmit = jest.fn();
    render(<SubmitButton handleSubmit={handleSubmit} value="Submit" />); 
    const submitButton = screen.getByRole('button', {name: 'Submit'}); 
    fireEvent.click(submitButton); 
    expect(handleSubmit).toHaveBeenCalledTimes(1); 
});

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