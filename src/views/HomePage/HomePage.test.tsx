import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import React from 'react';

test('renders welcome message for logged in user', () => {
    const user = { isAuthenticated: true, name: 'John Doe', group: 'user' };
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({ user }))
    }));
  
    render(<HomePage />);
});
  
test('renders welcome message for guest user', () => {
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({ isAuthenticated: false }))
    }));
  
    render(<HomePage />);
  
    expect(screen.getByText('Welcome to our system!')).toBeInTheDocument();
});
  