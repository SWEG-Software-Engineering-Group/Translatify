import { render, screen, fireEvent } from '@testing-library/react';
import MultipleLanguagesPicker from './MultipleLanguagesPicker';
import "@testing-library/jest-dom/extend-expect";

describe('MultipleLanguagesPicker', () => {
  // const languages = ['en', 'es', 'fr'];
  // const onChange = jest.fn();
  // const previousSelectedLanguages = ['en', 'fr'];
  
  // it('renders the component with all the languages', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} />);
    
  //   expect(screen.getByText('Select in which language this text needs to be translated:')).toBeInTheDocument();
  //   expect(screen.getByText('All secondary languages')).toBeInTheDocument();
  //   expect(screen.getByLabelText('en')).toBeInTheDocument();
  //   expect(screen.getByLabelText('es')).toBeInTheDocument();
  //   expect(screen.getByLabelText('fr')).toBeInTheDocument();
  //   expect(screen.getByLabelText('en')).not.toBeChecked();
  //   expect(screen.getByLabelText('es')).not.toBeChecked();
  //   expect(screen.getByLabelText('fr')).not.toBeChecked();
  // });
  
  // it('renders the component with pre-selected languages', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} previousSelectedLanguages={previousSelectedLanguages} />);
    
  //   expect(screen.getByText('Select in which language this text needs to be translated:')).toBeInTheDocument();
  //   expect(screen.getByText('All secondary languages')).toBeInTheDocument();
  //   expect(screen.getByLabelText('en')).toBeInTheDocument();
  //   expect(screen.getByLabelText('es')).toBeInTheDocument();
  //   expect(screen.getByLabelText('fr')).toBeInTheDocument();
  //   expect(screen.getByLabelText('en')).toBeChecked();
  //   expect(screen.getByLabelText('es')).not.toBeChecked();
  //   expect(screen.getByLabelText('fr')).toBeChecked();
  // });
  
  // it('selects all the languages when the "All secondary languages" checkbox is checked', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} />);
    
  //   fireEvent.click(screen.getByLabelText('All secondary languages'));
    
  //   expect(screen.getByLabelText('en')).not.toBeChecked();
  //   expect(screen.getByLabelText('es')).not.toBeChecked();
  //   expect(screen.getByLabelText('fr')).not.toBeChecked();
  // });
  
  // it('deselects all the languages when the "All secondary languages" checkbox is unchecked', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} previousSelectedLanguages={previousSelectedLanguages} />);
    
  //   fireEvent.click(screen.getByLabelText('All secondary languages'));
    
  //   expect(screen.getByLabelText('en')).toBeChecked();
  //   expect(screen.getByLabelText('es')).not.toBeChecked();
  //   expect(screen.getByLabelText('fr')).toBeChecked();
  // });
  
  // it('selects a language when the checkbox is checked', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} />);
    
  //   fireEvent.click(screen.getByLabelText('es'));
    
  //   expect(screen.getByLabelText('es')).toBeChecked();
  //   expect(onChange).toHaveBeenCalledWith(['es']);
  // });
  
  // it('deselects a language when the checkbox is unchecked', () => {
  //   render(<MultipleLanguagesPicker languages={languages} onChange={onChange} previousSelectedLanguages={previousSelectedLanguages} />);
    
  //   fireEvent.click(screen.getByLabelText('en'));
    
  //   expect(screen.getByLabelText('en')).toBeChecked();
  //   expect(onChange).toHaveBeenCalledWith(['fr']);
  // });
  
  // it('shows a message when there are no secondary languages', () => {
  //   render(<MultipleLanguagesPicker languages={[]} onChange={onChange} />);
    
  //   expect(screen.getByText('There is no secondary language in this tenant to select from')).toBeInTheDocument();
  // });
});
