import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders the search input', () => {
    render(<SearchBox handleParentSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Type here to search...')).toBeInTheDocument();
  });

  it('calls handleParentSearch with the query when the search button is clicked', () => {
    const mockHandleParentSearch = jest.fn();
    render(<SearchBox handleParentSearch={mockHandleParentSearch} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByPlaceholderText('Type here to search...');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockHandleParentSearch).toHaveBeenCalledWith('test query');
  });

  it('calls handleParentSearch with an empty string when the search input is empty and the search button is clicked', () => {
    const mockHandleParentSearch = jest.fn();
    render(<SearchBox handleParentSearch={mockHandleParentSearch} />);

    const searchButton = screen.getByRole('button');

    fireEvent.click(searchButton);

    expect(mockHandleParentSearch).toHaveBeenCalledWith('');
  });

  it('calls handleParentSearch with the query when the enter key is pressed in the search input', () => {
    const mockHandleParentSearch = jest.fn();
    render(<SearchBox handleParentSearch={mockHandleParentSearch} />);

    const searchInput = screen.getByPlaceholderText('Type here to search...');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockHandleParentSearch).toHaveBeenCalledWith('test query');
  });

  it('calls handleParentSearch with an empty string when the enter key is pressed in the search input and the query is empty', () => {
    const mockHandleParentSearch = jest.fn();
    render(<SearchBox handleParentSearch={mockHandleParentSearch} />);

    const searchInput = screen.getByPlaceholderText('Type here to search...');

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockHandleParentSearch).toHaveBeenCalledWith('');
  });
});