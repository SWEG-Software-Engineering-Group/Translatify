import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';
import ResetPasswordView from './ResetPasswordView';

describe('ResetPasswordView', () => {
  test('should render ResetPasswordView', async () => {
    render(
      <MemoryRouter>
        <ResetPasswordView />
      </MemoryRouter>
    );

    // fill the form with some data
    userEvent.type(screen.getByLabelText('Code'), '123456');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
    userEvent.type(screen.getByLabelText('New password'), 'password123');

    // click the submit button
    userEvent.click(screen.getByRole('button', {name: 'Reset password and login'}));
  });
});
