import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Picker from './Picker';

describe("Picker", () => {
    const id = "test-picker";
    const choices = ["Apple", "Banana", "Cherry"];
    const onChange = jest.fn();
    const onClear = jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("renders a text field and autocomplete with choices", () => {
      const value = "Apple";
  
      render(<Picker id={id} value={value} onChange={onChange} choices={choices} onClear={onClear} />);
  
      expect(screen.getByLabelText(id)).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("combobox"));
    });
  
    it("calls onChange when a choice is selected", () => {
      const value = "Apple";
  
      render(<Picker id={id} value={value} onChange={onChange} choices={choices} onClear={onClear} />);
      fireEvent.click(screen.getByRole("combobox"));
    });
  
    it("calls onClear when the value is cleared", () => {
      const value = "Apple";
  
      render(<Picker id={id} value={value} onChange={onChange} choices={choices} onClear={onClear} />);
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByLabelText("Clear"));
  
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });