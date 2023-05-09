import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RejectTranslationButton from './RejectTranslationButton';
import { putData } from '../../../services/axios/axiosFunctions';
import { useAuth } from '../../../hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';
import Text from '../../../types/Text';

jest.mock('../../../services/axios/axiosFunctions');
jest.mock('../../../hooks/useAuth');

describe('RejectTranslationButton', () => {
  const handleRejectMock = jest.fn();
  const translation: Text = {
    title: 'test title',
    language: 'en',
    category: {'id': 'test category id', 'name': 'test category name'},
    idTenant: 'test tenant id',
    text: 'test text',
    state: 0
  };
  const authMock = {
    tenant: {
      id: 'test tenant id',
    },
  };
  (useAuth as jest.Mock).mockReturnValue(authMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the reject button', () => {
    render(
      <MemoryRouter>
        <RejectTranslationButton handleReject={handleRejectMock} translation={translation} />
      </MemoryRouter>
    );
  });

  test('opens the dialog when the reject button is clicked', () => {
    render(
      <MemoryRouter>
        <RejectTranslationButton handleReject={handleRejectMock} translation={translation} />
      </MemoryRouter>
    );

    const rejectButton = screen.getByRole('button', { name: 'Reject the translation' });
    fireEvent.click(rejectButton);
  });

  test('closes the dialog when the cancel button is clicked', () => {
    render(
      <MemoryRouter>
        <RejectTranslationButton handleReject={handleRejectMock} translation={translation} />
      </MemoryRouter>
    );

    const rejectButton = screen.getByRole('button', { name: 'Reject the translation' });
    fireEvent.click(rejectButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
  });

  test('calls handleReject and closes the dialog when the reject button is clicked', async () => {
    (putData as jest.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <RejectTranslationButton handleReject={handleRejectMock} translation={translation} />
      </MemoryRouter>
    );

    const rejectButton = screen.getByRole('button', { name: 'Reject the translation' });
    fireEvent.click(rejectButton);

    const rejectDialogButton = screen.getByRole('button', { name: 'Reject' });
    fireEvent.click(rejectDialogButton);
    await waitFor(() => expect(putData).toHaveBeenCalledTimes(1));

    expect(handleRejectMock).toHaveBeenCalledTimes(0);
  });
});