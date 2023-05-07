import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import LanguageList from './LanguageList';

jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ tenant: { id: 1, defaultLanguage: 'en' } })),
}));

describe('LanguageList component', () => {
  test('renders "No languages found" when no languages are provided', () => {
    render(<LanguageList oldLanguages={[]} />);
    expect(screen.getByText(/no languages found/i)).toBeInTheDocument();
  });

  test('renders provided languages', () => {
    render(<LanguageList oldLanguages={['en', 'es']} />);
    expect(screen.getByText(/en/i)).toBeInTheDocument();
    expect(screen.getByText(/es/i)).toBeInTheDocument();
  });

  test('renders add language modal on button click', async () => {
    render(<LanguageList oldLanguages={['English', 'French']} />);
    const addLanguageButton = screen.getByRole('button', { name: /add new language/i });
    fireEvent.click(addLanguageButton);
    const addLanguageModal = await screen.findByRole('dialog');
    expect(addLanguageModal).toBeInTheDocument();
  });

  test('disables submit button when submitting the form', async () => {
    render(<LanguageList oldLanguages={[]} />, { wrapper: MemoryRouter });
    const addButton = screen.getByRole('button', { name: /add new language/i });
    fireEvent.click(addButton);

    const input = screen.getByLabelText('New language');
    const addButtonInDialog = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'fr' } });
    fireEvent.click(addButtonInDialog);
  });

});
