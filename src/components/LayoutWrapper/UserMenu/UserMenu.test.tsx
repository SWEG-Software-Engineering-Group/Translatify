import { render, screen } from "@testing-library/react";
import { useAuth } from "../../../hooks/useAuth";
import "@testing-library/jest-dom/extend-expect";
import UserMenu from "./UserMenu";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../../hooks/useAuth");

describe("UserMenu component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ tenant: { id: "test-tenant-id" } });
  });

  it("should render with given props", () => {
      render(
        <Router>
          <UserMenu userType="user" />
        </Router>
      );
      expect(screen.getByText("Translatify")).toBeInTheDocument();
      expect(screen.queryByText("Login")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("should render login link if userType is null", () => {
      render(
        <Router>
          <UserMenu userType="" />
        </Router>
      );
      expect(screen.getByText("Translatify")).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Menu" })).not.toBeInTheDocument();
  });

  it('should render correct links for admin type', () => {
    render(
      <Router>
        <UserMenu userType="admin" />
      </Router>
    );

    expect(screen.getByText("Translatify")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it('should render correct links for superadmin type', () => {
    render(
      <Router>
        <UserMenu userType="superadmin" />
      </Router>
    );

    expect(screen.getByText("Translatify")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});