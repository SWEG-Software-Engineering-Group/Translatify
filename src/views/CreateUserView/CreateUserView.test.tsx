import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CreateUserView from './CreateUserView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('CreateUserView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
    
      test("renders form inputs correctly", () => {
        render(<BrowserRouter><CreateUserView /></BrowserRouter>);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Surname")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
      });
    
      test("displays error message if form is submitted with invalid inputs", () => {
        render(<BrowserRouter><CreateUserView /></BrowserRouter>);
        fireEvent.click(screen.getByRole("button", { name: "Submit" }));
        expect(screen.getByRole("alert")).toHaveTextContent("Please fill in all form fields");
      });
});