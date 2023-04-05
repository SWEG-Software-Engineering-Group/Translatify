import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GoToTenantButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/TenantSettings');
    };
  
    return (
      <Button variant="contained" color="primary" onClick={handleClick}>
        Go to Settings
      </Button>
    );
  }