import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import LanguageListItem from './LanguageListItem';

test('renders language text', () => {
    render(<LanguageListItem language="Spanish" handleDelete={() => {}} />);
    const languageText = screen.getByText(/Language: Spanish/i);
    expect(languageText).toBeInTheDocument();
  });
  
  test('opens dialog on remove button click', () => {
    render(<LanguageListItem language="Spanish" handleDelete={() => {}} />);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    const confirmDialogTitle = screen.getByText(/Confirm Language Deletion/i);
    expect(confirmDialogTitle).toBeInTheDocument();
  });
  
  test('calls handleDelete with correct parameter on confirmation', () => {
    const handleDeleteMock = jest.fn();
    render(<LanguageListItem language="Spanish" handleDelete={handleDeleteMock} />);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(confirmButton);
  });
  