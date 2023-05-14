import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Tenant from "../../../types/Tenant";
import GoToTenantButton from "./GoToTenantButton";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React from 'react';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('GoToTenantButton', () => {
  const tenant: Tenant = {
    id: 'tenant1',
    tenantName: 'Test Tenant 1',
    admins: ['testadmin1@test.com'],
    users: [],
    categories: [],
    defaultLanguage: 'en',
    creationDate: 123456789,
    languages: ['fr', 'en']
  };
  beforeEach(() => {
    (useNavigate as jest.Mock<NavigateFunction>).mockClear();
  });

  test('renders the button', () => {
    render(<GoToTenantButton tenant={tenant} />);
  });

  test('renders the correct label', () => {
    render(<GoToTenantButton tenant={tenant} />);
    expect(screen.getByRole('button', {name: 'Go to Tenant'})).toBeInTheDocument();

  });

  test('navigates to the correct page when clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock<NavigateFunction>).mockReturnValue(navigateMock);

    render(<GoToTenantButton tenant={tenant} />);
    fireEvent.click(screen.getByRole('button', {name: 'Go to Tenant'}));
    expect(navigateMock).toHaveBeenCalledWith(`/tenant/${tenant.id}`);
  });
});