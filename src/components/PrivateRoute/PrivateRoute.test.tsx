import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PrivateRoute from "./PrivateRoute";

jest.mock("../../hooks/useAuth");

describe("PrivateRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children if user is authenticated and belongs to allowed group", () => {
    const allowedUsers = ["admin"];
    const isAuthenticated = true;
    const user = { group: "admin" };
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated, user });
    const children = <div>Test Content</div>;

    render(
      <MemoryRouter initialEntries={["/test"]}>
        <PrivateRoute allowedUsers={allowedUsers}>{children}</PrivateRoute>
      </MemoryRouter>
    );

    expect(useAuth).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("redirects to login page if user is not authenticated", () => {
    const allowedUsers = ["admin"];
    const isAuthenticated = false;
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated });
    const children = <div>Test Content</div>;

    render(
      <MemoryRouter initialEntries={["/test"]}>
        <PrivateRoute allowedUsers={allowedUsers}>{children}</PrivateRoute>
      </MemoryRouter>
    );

    expect(useAuth).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("redirects to access denied page if user does not belong to allowed group", () => {
    const allowedUsers = ["admin"];
    const isAuthenticated = true;
    const user = { group: "user" };
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated, user });
    const children = <div>Test Content</div>;

    render(
      <MemoryRouter initialEntries={["/test"]}>
        <PrivateRoute allowedUsers={allowedUsers}>{children}</PrivateRoute>
      </MemoryRouter>
    );

    expect(useAuth).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Access Denied");
  });
});