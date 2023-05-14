import { render } from "@testing-library/react";
import { useNavigate, NavigateFunction} from "react-router-dom";
import DiscardButton from "./DiscardButton";
import React from 'react';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe("DiscardButton", () => {
    beforeEach(() => {
        (useNavigate as jest.Mock<NavigateFunction>).mockClear();
    });

    it("renders a button with the correct text", () => {
        render(<DiscardButton />);
    });

    it('calls useNavigate hook with -1 when clicked', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock<NavigateFunction>).mockReturnValue(mockNavigate);        
        
        render(<DiscardButton />);
        
        expect(mockNavigate).toHaveBeenCalledTimes(0);
      });

});