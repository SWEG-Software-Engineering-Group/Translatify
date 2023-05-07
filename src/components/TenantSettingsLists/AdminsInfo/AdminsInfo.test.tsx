import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import AdminsInfo from './AdminsInfo';

describe('AdminsInfo', () => {
    const admins = ['admin1', 'admin2'];
    
    it('should render the AdminsInfo component with the header and collapse', () => {
      render(<MemoryRouter><AdminsInfo adminsIds={admins} /></MemoryRouter>);
      const adminHeader = screen.getByText('Admin List');
      expect(adminHeader).toBeInTheDocument();
      const expandButton = screen.getByRole('button', { name: 'expand' });
      expect(expandButton).toBeInTheDocument();
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
    });
    
    it('should expand the component when the expand button is clicked', () => {
      render(<MemoryRouter><AdminsInfo adminsIds={admins} /></MemoryRouter>);
      const expandButton = screen.getByRole('button', { name: 'expand' });
      fireEvent.click(expandButton);
    });
    
    it('should collapse the component when the collapse button is clicked', () => {
      render(<MemoryRouter><AdminsInfo adminsIds={admins} /></MemoryRouter>);
      const expandButton = screen.getByRole('button', { name: 'expand' });
      fireEvent.click(expandButton);
      expect(screen.queryByTestId('admin-list')).not.toBeInTheDocument();
    });
  });