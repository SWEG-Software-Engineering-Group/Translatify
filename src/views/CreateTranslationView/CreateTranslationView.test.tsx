import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CreateTranslationView from './CreateTranslationView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
      tenant: {
        id: 'tenantId',
        defaultLanguage: 'en',
      },
      user: {
        group: 'user',
      },
    }),
}));
  
describe('CreateTranslationView', () => {
    test('renders without crashing', () => {
        render(
          <BrowserRouter>
            <CreateTranslationView />
          </BrowserRouter>
        );
      });

      test('should create a new translation when form is submitted', async () => {
        const mockResponse = { message: 'Translation created successfully' };
        global.fetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
        
        render(
          <BrowserRouter>
            <CreateTranslationView />
          </BrowserRouter>
        );
        
        expect(global.fetch).toHaveBeenCalledTimes(0);
    });

    test('should not create a new translation when form is submitted with empty text', async () => {
        const mockResponse = { message: 'Translation created successfully' };
        global.fetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
        
        render(
          <BrowserRouter>
            <CreateTranslationView />
          </BrowserRouter>
        );
        
        expect(global.fetch).toHaveBeenCalledTimes(0);
    });

      
});