import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MissingLinkView from './MissingLinkView';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

test('renders the Missing Link View page', () => {
    render(
      <MemoryRouter>
        <MissingLinkView />
      </MemoryRouter>
    );
  
    expect(screen.getByText('The page you tried to access doesn\'t exist')).toBeInTheDocument();
});