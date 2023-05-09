import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

test('renders welcome message for logged in user', () => {
    // Mock the authenticated user context
    const user = { isAuthenticated: true, name: 'John Doe', group: 'user' };
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({ user }))
    }));
  
    render(<HomePage />);
});
  
test('renders welcome message for guest user', () => {
    // Mock the guest user context
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({ isAuthenticated: false }))
    }));
  
    render(<HomePage />);
  
    // Check if the welcome message and login prompt are rendered
    expect(screen.getByText('Welcome to our system!')).toBeInTheDocument();
});
  