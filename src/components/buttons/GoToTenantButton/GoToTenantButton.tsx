import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tenant from '../../../types/Tenant';
import { Button } from '@mui/material';

export interface GoToTenantButtonProps {
  tenant: Tenant;
}

export default function GoToTenantButton(props: GoToTenantButtonProps) {
    const navigate = useNavigate();
  
    const handleClick = () => {
      // Qui salvi il Tenant del SuperAdmin nel localStorage.
      localStorage.setItem('superadmin_tenant', props.tenant.name || '');
  
      // Poi puoi navigare verso la pagina del Tenant.
      navigate('/tenant');
    };
  
    return (
      <Button variant="contained" color="primary" onClick={handleClick}>
        Go to Tenant
      </Button>
    );
  }