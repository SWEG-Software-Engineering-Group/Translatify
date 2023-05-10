import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateTextButton from './CreateTextButton';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('renders without crashing', () => {
    render(
        <MemoryRouter>
        <CreateTextButton />
        </MemoryRouter>
    );
});

test('clicking the button navigates to the /write route', () => {
    const navigateMock = jest.fn();
    const useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(navigateMock);

    render(
        <MemoryRouter>
        <CreateTextButton />
        </MemoryRouter>
    );
    const addTextButton = screen.getByLabelText('add');
    fireEvent.click(addTextButton);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/write');

    useNavigateMock.mockReset();
});