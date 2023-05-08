import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import TextList from './TextList';
import TextState from '../../types/TextState';
import Text from '../../types/Text';
import { getData } from '../../services/axios/axiosFunctions';

jest.mock('../../services/axios/axiosFunctions');

jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
      tenant: {
        id: '1',
        defaultLanguage: 'English',
      },
    }),
  }));

describe('TextList', () => {
  const texts: Text[] = [
    {
      idTenant: '1',
      language: 'English',
      category: { id: '1', name: 'Category 1' },
      title: 'Text 1',
      text: 'Lorem ipsum dolor sit amet',
      state: TextState.toBeTranslated,
      feedback: '',
    },
    {
      idTenant: '2',
      language: 'Spanish',
      category: { id: '2', name: 'Category 2' },
      title: 'Text 2',
      text: 'Consectetur adipiscing elit',
      state: TextState.toBeVerified,
      feedback: '',
    },
    {
      idTenant: '3',
      language: 'German',
      category: { id: '3', name: 'Category 3' },
      title: 'Text 3',
      text: 'Sed do eiusmod tempor incididunt',
      state: TextState.originalText,
      feedback: '',
    },
  ];

  beforeEach(() => {
    (getData as jest.Mock).mockResolvedValue({ data: { response: texts } });
  });

  test('displays a table of texts', async () => {
    render(
      <MemoryRouter>
        <TextList categoryFilter="-" languageFilter="-" stateFilter="-" searchFilter="" userType="" />
      </MemoryRouter>
    );

    // Wait for the API call to complete and the table to render
    await waitFor(() => expect(getData).toHaveBeenCalledTimes(1));

    // Check that the table headers are displayed
    const tableHeaders = screen.getAllByRole('columnheader');

    expect(tableHeaders).toHaveLength(6);
    expect(tableHeaders[1]).toHaveTextContent('Text title');
    expect(tableHeaders[2]).toHaveTextContent('Language');
    expect(tableHeaders[3]).toHaveTextContent('Category');
    expect(tableHeaders[4]).toHaveTextContent('State');
    expect(tableHeaders[5]).toHaveTextContent('Actions');

    // Check that the table rows are displayed
    const tableRows = screen.getAllByRole('row');

    expect(tableRows[1]).toHaveTextContent('Text 1');
    expect(tableRows[3]).toHaveTextContent('Category 2');
  });

  test('displays a message when no texts match the filters', async () => {
    render(
      <MemoryRouter>
        <TextList categoryFilter="-" languageFilter="-" stateFilter="-" searchFilter="nonexistent" userType="" />
      </MemoryRouter>
    );

    // Wait for the API call to complete and the message to render
    await waitFor(() => expect(getData).toHaveBeenCalledTimes(1));
    const message = screen.getByText('There is no text that matches these filters');
    expect(message).toBeInTheDocument();
  });
});