import { render, screen } from '@testing-library/react';
import UserTranslationItem from './UserTranslationItem';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";

const text = {
  idTenant: '1',
  language: 'en',
  category: { id: '1', name: 'Category 1' },
  title: 'My Translation',
  text: 'Hello world',
  state: 0,
  comment: 'No comment',
  link: 'http://example.com',
  feedback: 'Great job!'
};

test('renders without crashing', () => {
  render(
    <MemoryRouter>
        <UserTranslationItem text={text} />
    </MemoryRouter>
  );
});

test('renders correct text', () => {
    render(
        <MemoryRouter>
            <UserTranslationItem text={text} />
        </MemoryRouter>
      );
    
    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('My Translation')).toBeInTheDocument();
    expect(screen.getByText('Comment:')).toBeInTheDocument();
    expect(screen.getByText('State:')).toBeInTheDocument();
});

test('renders correct link', () => {
    render(
      <MemoryRouter>
        <UserTranslationItem text={text} />
      </MemoryRouter>
    );
    
});