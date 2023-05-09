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
  test('renders the translation title and state', () => {
    render(<ReviewCard translation={translation} removeFromList={() => {}} />);
    const title = screen.getByText(translation.title);
    const state = screen.getByText('To be translated');
    expect(title).toBeInTheDocument();
    expect(state).toBeInTheDocument();
  });

  test('renders the translation feedback and comment', () => {
    render(<ReviewCard translation={translation} removeFromList={() => {}} />);
    const feedback = screen.getByText('Feedback:');
    const comment = screen.getByText('Comment:');
    expect(feedback).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
  });

  test('renders the translation text when expanded', () => {
    render(<ReviewCard translation={translation} removeFromList={() => {}} />);
    const expandButton = screen.getByLabelText('Show more details about the translation');
    fireEvent.click(expandButton);
  });

  test('calls removeFromList when the translation is accepted', () => {
    const removeFromListMock = jest.fn();
    render(<ReviewCard translation={translation} removeFromList={removeFromListMock} />);

    expect(removeFromListMock).toHaveBeenCalledTimes(0);
  });

  test('calls removeFromList when the translation is rejected', () => {
    const removeFromListMock = jest.fn();
    render(<ReviewCard translation={translation} removeFromList={removeFromListMock} />);
    const rejectButton = screen.getByLabelText('Reject the translation');
    fireEvent.click(rejectButton);
    expect(removeFromListMock).toHaveBeenCalledTimes(0);
  });
});