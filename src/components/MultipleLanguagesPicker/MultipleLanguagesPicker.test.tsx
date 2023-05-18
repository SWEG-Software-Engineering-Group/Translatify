import { render, screen } from '@testing-library/react';
import MultipleLanguagesPicker from './MultipleLanguagesPicker';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

describe('MultipleLanguagesPicker', () => {
  test('renders the MultipleLanguagesPicker component', () => {
    render(<MultipleLanguagesPicker onChange={() => {}} languages={[]} previousSelectedLanguages={[]} />);
  });

  test('renders the correct message when there are no languages to select from', () => {
    render(<MultipleLanguagesPicker onChange={() => {}} languages={[]} previousSelectedLanguages={[]} />);
    expect(screen.getByText('There is no secondary language in this tenant to select from')).toBeInTheDocument();
  });

  test('renders the correct message when there are languages to select from', () => {
    render(<MultipleLanguagesPicker onChange={() => {}} languages={['English', 'Spanish']} previousSelectedLanguages={[]} />);
    expect(screen.getByText('Select in which language this text needs to be translated:')).toBeInTheDocument();
  });

  test('renders the correct number of checkboxes when there are languages to select from', () => {
    render(<MultipleLanguagesPicker onChange={() => {}} languages={['English', 'Spanish']} previousSelectedLanguages={[]} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3); // one for "All secondary languages" and one for each language
  });
});
