
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Text from '../../../types/Text'
import AcceptTranslationButton from './AcceptTranslationButton';
import { putData } from '../../../services/axios/axiosFunctions';



jest.mock('../../../services/axios/axiosFunctions');
jest.mock('../../../hooks/useAuth');

describe('AcceptTranslationButton', () => {
  const handleAcceptMock = jest.fn();
  const translation: Text = {
    title: 'title',
    language: 'it',
    category: {'id': 'category id', 'name': 'category name'},
    idTenant: 'tenantId',
    text: 'test',
    state: 2
  };
  const authMock = {
    tenant: {
      id: 'tenantId',
    },
  };

  (useAuth as jest.Mock).mockReturnValue(authMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the accept button', () => {
    render(
      <MemoryRouter>
        <AcceptTranslationButton handleAccept={handleAcceptMock} translation={translation} />
      </MemoryRouter>
    );
  });

  test('opens the dialog when the accept button is clicked', () => {
    render(
      <MemoryRouter>
        <AcceptTranslationButton handleAccept={handleAcceptMock} translation={translation} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Approve the translation' }));
  });

  test('closes the dialog when the cancel button is clicked', () => {
    render(
      <MemoryRouter>
        <AcceptTranslationButton handleAccept={handleAcceptMock} translation={translation} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Approve the translation' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  });

  test('calls the handleAccept function when the accept button is clicked', async () => {
    (putData as jest.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <AcceptTranslationButton handleAccept={handleAcceptMock} translation={translation} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Approve the translation' }));
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    await waitFor(() => expect(putData).toHaveBeenCalledTimes(1));
    expect(handleAcceptMock).toHaveBeenCalledTimes(0);
  });

});