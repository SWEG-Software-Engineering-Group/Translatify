import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

jest.mock('axios');
jest.mock('../../hooks/useAuth');

describe('Axios Functions Tests', () => {

    it('should throw an error if axios.get throws an error', async () => {
      const error = new Error('Something went wrong');
      (axios.get as jest.Mock).mockRejectedValue(error);
  
      // Mock the useAuth function to return an authenticated user
      (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
      });
  });