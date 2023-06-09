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
    localStorage.setItem('superadmin_tenant', props.tenant.tenantName || '');

    // Poi puoi navigare verso la pagina del Tenant.
    navigate(`/tenant/${props.tenant.id}`);
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0057cb',
        color: '#fff',
        borderRadius: '50px',
        '&:hover': {
          backgroundColor: '#006cff',
        },
      }}
      onClick={handleClick}
    >
      Go to Tenant
    </Button>
  );
}
