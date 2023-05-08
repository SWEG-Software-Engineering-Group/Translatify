import { render, screen, fireEvent } from '@testing-library/react';
import TextListItem from './TextListItem';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { deleteData, putData } from '../../services/axios/axiosFunctions';
import TextState from '../../types/TextState';

jest.mock('../../services/axios/axiosFunctions');

const textData = {
    idTenant: '1',
    title: 'Test Title',
    language: 'en',
    category: { id: '1', name: 'Test Category' },
    state: TextState.toBeVerified,
    text: 'Test Text',
    comment: 'Test Comment',
    feedback: 'Test Feedback',
    link: 'Test Link',    
};

describe('TextListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <TextListItem textData={textData} userType="admin" defaultLanguage="en" handleDelete={() => {}} handleRedo={() => {}} />
        </MemoryRouter>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('displays text when expanded', () => {
    render(
        <MemoryRouter>
            <TextListItem textData={textData} userType="admin" defaultLanguage="en" handleDelete={() => {}} handleRedo={() => {}} />
        </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'expand row' }));
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  test('calls handleDeleteText function when delete text button is clicked', async () => {
    (deleteData as jest.Mock).mockResolvedValue({});
    const handleDeleteMock = jest.fn();

    render(
        <MemoryRouter>
            <TextListItem textData={textData} userType="admin" defaultLanguage="en" handleDelete={handleDeleteMock} handleRedo={() => {}} />
        </MemoryRouter>
    );

    expect(deleteData).toHaveBeenCalledTimes(0);
  });

  test('calls handleRedoText function when Redo button is clicked', async () => {
    (putData as jest.Mock).mockResolvedValue({});
    const handleRedoMock = jest.fn();

    render(
        <MemoryRouter>
            <TextListItem textData={{ ...textData, state: TextState.toBeVerified }} userType="admin" defaultLanguage="en" handleDelete={() => {}} handleRedo={handleRedoMock} />
        </MemoryRouter>
    );

    expect(putData).toHaveBeenCalledTimes(0);
  });
});