import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTitle from './PageTitle';

describe('PageTitle', () => {
  test('renders the title passed as prop', () => {
    const title = 'Test Title';
    render(<PageTitle title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toEqual('H1');
  });

  test('renders the component properly', () => {
    const title = 'Test Title';
    render(<PageTitle title={title} />);
  });
});
