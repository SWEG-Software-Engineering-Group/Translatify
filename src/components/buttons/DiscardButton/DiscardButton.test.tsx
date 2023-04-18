import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, NavigateFunction} from "react-router-dom";
import DiscardButton from "./DiscardButton";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe("DiscardButton", () => {
    beforeEach(() => {
        (useNavigate as jest.Mock<NavigateFunction>).mockClear();
    });

    it("renders a button with the correct text", () => {
        render(<DiscardButton />);

        expect(screen.getByRole("button", { name: "Discard" })).toBeInTheDocument();
    });

    it('calls useNavigate hook with -1 when clicked', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock<NavigateFunction>).mockReturnValue(mockNavigate);        
        
        render(<DiscardButton />);
        const discardButton = screen.getByRole('button', { name: 'Discard' });
        fireEvent.click(discardButton);
        
        expect(mockNavigate).toHaveBeenCalledTimes(1);
      });

});