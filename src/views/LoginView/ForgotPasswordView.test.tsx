import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPasswordView from "./ForgotPasswordView";
import { MemoryRouter } from "react-router-dom";

describe("ForgotPasswordView", () => {
  test("renders the page", () => {
    render(<MemoryRouter><ForgotPasswordView /></MemoryRouter>);
  });

  test("updates the email input value when typing", () => {
    render(<MemoryRouter><ForgotPasswordView /></MemoryRouter>);
    const emailInput = screen.getByLabelText(/Insert your email here/i);
    userEvent.type(emailInput, "test@example.com");
  });

  test("displays the loading state when submit button is clicked", () => {
    render(<MemoryRouter><ForgotPasswordView /></MemoryRouter>);
    const emailInput = screen.getByLabelText(/Insert your email here/i);
    const submitButton = screen.getByRole("button", { name: /Send Recovery Code/i });
    userEvent.type(emailInput, "test@example.com");
    userEvent.click(submitButton);
  });
});
