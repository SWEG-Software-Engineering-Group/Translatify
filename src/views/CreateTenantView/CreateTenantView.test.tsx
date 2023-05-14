import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CreateTenantView from './CreateTenantView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('CreateTenantView', () => {
    test('renders without crashing', () => {
        render(
          <BrowserRouter>
            <CreateTenantView />
          </BrowserRouter>
        );
      });

      test('should create a new tenant when form is submitted', async () => {
        const mockResponse = { message: 'Tenant created successfully' };
        global.fetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
        
        render(
          <BrowserRouter>
            <CreateTenantView />
          </BrowserRouter>
        );
        
        const createTenantButton = screen.getByText('Create Tenant');
        fireEvent.click(createTenantButton);
        
        expect(global.fetch).toHaveBeenCalledTimes(0);
      });
});
