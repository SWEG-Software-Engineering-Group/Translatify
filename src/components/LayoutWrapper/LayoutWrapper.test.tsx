import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LayoutWrapper from "./LayoutWrapper";

describe("LayoutWrapper", () => {
  it("renders user menu and main content", () => {

    const userType = "admin";
    const children = <div>Test Content</div>;

    render(
      <MemoryRouter>
        <LayoutWrapper userType={userType}>{children}</LayoutWrapper>
      </MemoryRouter>
    );
  });
});