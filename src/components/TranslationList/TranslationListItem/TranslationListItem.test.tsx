import { render, screen } from '@testing-library/react';
import TranslationListItem from './TranslationListItem';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";

test('renders without crashing', () => {
    const translation = {
      id: '1',
      text: 'Hello world',
      state: 0,
      feedback: 'Great job!',
      comment: 'No comment',
      link: 'http://example.com',
      category: { id: '1', name: 'Category 1' }
    };
    
    render(
      <MemoryRouter>
        <TranslationListItem translation={translation} />
      </MemoryRouter>
    );
});

test('renders correct text', () => {
    const translation = {
      id: '1',
      text: 'Hello world',
      state: 0,
      feedback: 'Great job!',
      comment: 'No comment',
      link: 'http://example.com',
      category: { id: '1', name: 'Category 1' }
    };
    
    render(
      <MemoryRouter>
        <TranslationListItem translation={translation} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('Feedback:')).toBeInTheDocument();
    expect(screen.getByText('Great job!')).toBeInTheDocument();
    expect(screen.getByText('Comment:')).toBeInTheDocument();
    expect(screen.getByText('No comment')).toBeInTheDocument();
    expect(screen.getByText('Open link')).toBeInTheDocument();

});

test('renders with no feedback', () => {
    const translation = {
      id: '1',
      text: 'Hello world',
      state: 0,
      feedback: '',
      comment: 'No comment',
      link: 'http://example.com',
      category: { id: '1', name: 'Category 1' }
    };
    
    render(
      <MemoryRouter>
        <TranslationListItem translation={translation} />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Feedback:')).toBeNull();
    expect(screen.queryByText('No feedback')).toBeNull();
});

test('renders with no link', () => {
    const translation = {
      id: '1',
      text: 'Hello world',
      state: 0,
      feedback: 'Great job!',
      comment: 'No comment',
      link: '',
      category: { id: '1', name: 'Category 1' }
    };
    
    render(
      <MemoryRouter>
        <TranslationListItem translation={translation} />
      </MemoryRouter>
    );
    
    expect(screen.queryByRole('button', { name: 'Open link' })).toBeNull();
});