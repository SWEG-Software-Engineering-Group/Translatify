import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ReviewCard from './ReviewCard';
import TextState from '../../types/TextState';

const category = { id: '1', name: 'General' };

const translation = {
  idTenant: 'tenantId',
  language: 'en',
  category: category,
  title: 'Test Translation',
  text: 'Test text',
  state: TextState.toBeTranslated,
  feedback: 'Test feedback',
  comment: 'Test comment',
  link: 'http://example.com',
};

describe('ReviewCard', () => {
  it('renders the translation details', () => {
    render(<ReviewCard translation={translation} />);

    expect(screen.getByText('Test Translation')).toBeInTheDocument();
    expect(screen.getByText('Feedback:')).toBeInTheDocument();
    expect(screen.getByText('Test feedback')).toBeInTheDocument();
    expect(screen.getByText('Comment:')).toBeInTheDocument();
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  it('expands the card when the expand button is clicked', () => {
    render(<ReviewCard translation={translation} />);

    const expandButton = screen.getByLabelText('Show more details about the translation');
    expect(expandButton).toBeInTheDocument();

    fireEvent.click(expandButton);

    expect(screen.getByText('Text:')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });
});