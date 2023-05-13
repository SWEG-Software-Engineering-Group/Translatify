import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import ReviewTextsView from './ReviewTextsView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('ReviewTestsView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('ReviewTextsView', () => {
        test('should render ReviewTextsView', async () => {
          render(
            <MemoryRouter>
              <ReviewTextsView />
            </MemoryRouter>
          );
      
          await screen.findByText('Review Texts Page');
        });
      
        test('should fetch languages and display them in picker', async () => {
          const mockGetData = jest.fn(() => Promise.resolve({ data: { languages: ['en', 'fr', 'de'] } }));
          jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));
      
          render(
            <MemoryRouter>
              <ReviewTextsView />
            </MemoryRouter>
          );
      
          await waitFor(() => expect(mockGetData).toHaveBeenCalledTimes(0));
        });
      
        test('should fetch texts and display them in list', async () => {
          const mockGetData = jest.fn(() => Promise.resolve({ data: { texts: [{ title: 'test', id: '1' }] } }));
          jest.mock('../../services/axios/axiosFunctions', () => ({ getData: mockGetData }));
      
          render(
            <MemoryRouter>
              <ReviewTextsView />
            </MemoryRouter>
          );
        });
      });
      
});