import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GoToTenantButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {

      // Poi puoi navigare verso la pagina del Tenant.
      navigate('/TenantTexts');
    };
  
    return (
      <Button variant="contained" color="primary" onClick={handleClick}>
        Go to Texts
      </Button>
    );
  }