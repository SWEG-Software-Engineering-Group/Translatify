import { ListItem, ListItemText, Typography } from '@mui/material';
import Tenant from '../../../types/Tenant';

export interface TenantListItemProps {
  tenant: Tenant;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: '12px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '16px',
  };

  const textStyle = {
    fontWeight: 'normal',
  };

  return (
    <ListItem sx={itemStyle}>
      <div style={{ flex: 1 }}>
        <Typography sx={labelStyle}>Tenant name:</Typography>
        <ListItemText primary={tenant.name} sx={textStyle} />
      </div>
      <div style={{ flex: 1 }}>
        <Typography sx={labelStyle}>Tenant ID:</Typography>
        <ListItemText primary={tenant.id} sx={textStyle} />
      </div>
      <div style={{ flex: 1 }}>
        <Typography sx={labelStyle}>Tenant Languages:</Typography>
        <ListItemText primary={tenant.languages.join(', ')} sx={textStyle} />
      </div>
    </ListItem>
  );
}
