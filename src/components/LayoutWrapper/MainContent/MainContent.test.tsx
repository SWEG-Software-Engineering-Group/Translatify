import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainContent from "./MainContent";

describe("MainContent", () => {
    test("renders children prop", () => {
        const testChild = <p data-testid="test-child">Test child component</p>;
        render(<MainContent>{testChild}</MainContent>);
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });
      
    test("renders Box component with correct props", () => {
        render(<MainContent children={undefined} />);
        const boxComponent = screen.getByRole("main");
        expect(boxComponent).toBeInTheDocument();
        expect(boxComponent).toHaveStyle("display: flex");
        expect(boxComponent).toHaveStyle("flex-direction: column");
        expect(boxComponent).toHaveStyle("align-items: center");
        expect(boxComponent).toHaveStyle("max-height: 80vh");
        expect(boxComponent).toHaveStyle("max-width: 1024px");
        expect(boxComponent).toHaveStyle("margin: auto");
        expect(boxComponent).toHaveStyle("padding-left: 2rem");
        expect(boxComponent).toHaveStyle("padding-right: 2rem");
        expect(boxComponent).toHaveStyle("flex-grow: 1");
      });
});
