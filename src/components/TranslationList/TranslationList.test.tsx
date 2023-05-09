import { render, screen } from '@testing-library/react';
import TranslationList from './TranslationList';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import TextState from '../../types/TextState';
import Text from '../../types/Text';

test('renders without crashing', () => {
    const translationList: Text[] = [
        {
          idTenant: "1",
          language: 'English',
          category: { id: '1', name: 'Category 1' },
          title: 'Translation 1',
          text: 'Hello world',
          state: TextState.originalText,
          feedback: 'Great job!',
          comment: 'No comment',
          link: 'http://example.com',
        },
        {
          idTenant: '2',
          language: 'Spanish',
          category: { id: '2', name: 'Category 2' },
          title: 'Translation 2',
          text: 'Hola mundo',
          state: TextState.toBeTranslated,
          feedback: 'Needs improvement',
          comment: '',
          link: '',
        },
      ];
    
    render(
      <MemoryRouter>
        <TranslationList translationList={translationList} removeFromList={() => {}} />
      </MemoryRouter>
    );
});

test('renders correct number of ReviewCard components', () => {
    const translationList: Text[] = [
        {
          idTenant: "1",
          language: 'English',
          category: { id: '1', name: 'Category 1' },
          title: 'Translation 1',
          text: 'Hello world',
          state: TextState.originalText,
          feedback: 'Great job!',
          comment: 'No comment',
          link: 'http://example.com',
        },
        {
          idTenant: '2',
          language: 'Spanish',
          category: { id: '2', name: 'Category 2' },
          title: 'Translation 2',
          text: 'Hola mundo',
          state: TextState.toBeTranslated,
          feedback: 'Needs improvement',
          comment: '',
          link: '',
        },
      ];
    
    render(
      <MemoryRouter>
        <TranslationList translationList={translationList} removeFromList={() => {}} />
      </MemoryRouter>
    );
});

test('renders "No translations found" message when list is empty', () => {
    const translationList: Text[] = [];
    
    render(
      <MemoryRouter>
        <TranslationList translationList={translationList} removeFromList={() => {}} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('No translations found')).toBeInTheDocument();
});

test('calls removeFromList function when ReviewCard is clicked', () => {
    const translationList: Text[] = [
        {
          idTenant: "1",
          language: 'English',
          category: { id: '1', name: 'Category 1' },
          title: 'Translation 1',
          text: 'Hello world',
          state: TextState.originalText,
          feedback: 'Great job!',
          comment: 'No comment',
          link: 'http://example.com',
        },
        {
          idTenant: '2',
          language: 'Spanish',
          category: { id: '2', name: 'Category 2' },
          title: 'Translation 2',
          text: 'Hola mundo',
          state: TextState.toBeTranslated,
          feedback: 'Needs improvement',
          comment: '',
          link: '',
        },
      ];
    
    const removeFromList = jest.fn();
    
    render(
      <MemoryRouter>
        <TranslationList translationList={translationList} removeFromList={removeFromList} />
      </MemoryRouter>
    );
    
    expect(removeFromList).toHaveBeenCalledTimes(0);
});