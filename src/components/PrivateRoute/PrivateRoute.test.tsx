import { render } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import PrivateRoute from './PrivateRoute';

jest.mock('../../hooks/useAuth');

describe('PrivateRoute', () => {
  beforeEach(() => {
    const useAuthMock = useAuth as jest.Mock;

    useAuthMock.mockReturnValue({ isAuthenticated: false });
  });

  it('renders children when the user is authenticated and belongs to the allowed user group', () => {
    const useAuthMock = useAuth as jest.Mock;

    useAuthMock.mockReturnValue({ isAuthenticated: true, user: { group: 'allowedGroup' } });

    render(
      <PrivateRoute allowedUsers={['allowedGroup']}>
        <div>Allowed content</div>
      </PrivateRoute>,
    );
  });
});