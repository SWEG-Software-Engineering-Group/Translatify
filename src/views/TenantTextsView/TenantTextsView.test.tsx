import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import TenantTextsView from './TenantTextsView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../components/LayoutWrapper/LayoutWrapper', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

test('renders the TenantTextsView component', () => {
    render(
      <MemoryRouter>
        <TenantTextsView />
      </MemoryRouter>
    );
});

test('renders the category picker with correct options', () => {
    render(
      <MemoryRouter>
        <TenantTextsView />
      </MemoryRouter>
    );
  
    const picker = screen.getByLabelText('Choose category to filter');
    fireEvent.mouseDown(picker);
});

test('renders the language picker with correct options', async () => {  
    render(
      <MemoryRouter>
        <TenantTextsView />
      </MemoryRouter>
    );
  
    const picker = screen.getByLabelText('Choose language to filter');
    fireEvent.mouseDown(picker);
});
  
  