import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import GoToPageButton from './GoToPageButton';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('GoToPageButton', () => {
  const mockButton = {page: "/TenantSettings", label: "Go to Tenant Settings"};
  beforeEach(() => {
    (useNavigate as jest.Mock<NavigateFunction>).mockClear();
});



  it('renders the correct label', () => {
    render(<GoToPageButton {...mockButton} />);
    expect(screen.getByRole("button", {name: mockButton.label})).toBeInTheDocument();
  });

  it('navigates to the correct page when clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock<NavigateFunction>).mockReturnValue(navigateMock);

    const { getByRole } = render(<GoToPageButton {...mockButton} />);
    fireEvent.click(getByRole('button'));
    expect(navigateMock).toHaveBeenCalledWith(mockButton.page);
  });
});
