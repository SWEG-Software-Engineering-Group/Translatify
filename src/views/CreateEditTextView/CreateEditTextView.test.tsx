import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateEditTextView from './CreateEditTextView';
import { useAuth } from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");

describe('CreateEditTextView', () => {
    it('renders CreateEditTextView component', () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: {
                group: "admin"
            }
        });
        render(<MemoryRouter><CreateEditTextView/></MemoryRouter>);
    });

});