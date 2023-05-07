import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import Languages from './Languages';

// Mock the axiosFunctions module
jest.mock('../../../services/axios/axiosFunctions', () => ({
  getData: jest.fn(() => Promise.resolve({ data: { languages: ['en', 'fr', 'de'] } }))
}));

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ tenant: { id: 123 } }))
}));

describe('Languages', () => {
  it('renders the language list when the expand button is clicked', async () => {
    render(<Languages />, { wrapper: MemoryRouter });

    // Click the expand button and wait for the content to appear
    const expandButton = screen.getByRole('button', { name: 'expand' });
    fireEvent.click(expandButton);
    
  });
});
