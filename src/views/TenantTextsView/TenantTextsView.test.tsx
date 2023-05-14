import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import TenantTextsView from './TenantTextsView';

jest.mock('../../components/PrivateRoute/PrivateRoute', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: {
      group: 'admin'
    },
    tenant: {
      id: '123',
      defaultLanguage: 'en'
    }
  }))
}));
jest.mock('../../services/axios/axiosFunctions', () => ({
  getData: jest.fn().mockImplementation((url: string) => {
    switch (url) {
      case `${process.env.REACT_APP_API_KEY}/tenant/123/secondaryLanguages`:
        return Promise.resolve({ data: { languages: ['en', 'fr', 'es'] } });
      case `${process.env.REACT_APP_API_KEY}/tenant/123/allCategories`:
        return Promise.resolve({ data: { Categories: [{ name: 'Category 1' }, { name: 'Category 2' }] } });
      default:
        return Promise.resolve({ data: {} });
    }
  })
}));

describe('TenantTextsView', () => {
  test('renders category picker with correct values', async () => {
    render(
      <MemoryRouter>
        <TenantTextsView />
      </MemoryRouter>
    );

    const categoryPicker = screen.getByLabelText('Choose category to filter');
    fireEvent.mouseDown(categoryPicker);
  });

  test('renders language picker with correct values', async () => {
    render(
      <MemoryRouter>
        <TenantTextsView />
      </MemoryRouter>
    );

    const languagePicker = screen.getByLabelText('Choose language to filter');
    fireEvent.mouseDown(languagePicker);
  });
});