import { ListItem, Typography, Stack, Box } from '@mui/material';
import Tenant from '../../../types/Tenant';
import GoToTenantButton from "../../../components/buttons/GoToTenantButton/GoToTenantButton";

export interface TenantListItemProps {
  tenant: Tenant;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {
  return (
    <ListItem
      sx={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: '12px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="16px"
      >
        <Stack flex={1} alignItems="flex-start" >
          <Typography fontWeight="bold">Name</Typography>
          <Typography fontWeight="normal">{tenant.tenantName}</Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-start">
          <Typography fontWeight="bold">ID</Typography>
          <Typography fontWeight="normal">{tenant.id}</Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-start">
          <Typography fontWeight="bold"> Languages</Typography>
          <Typography fontWeight="normal">
            {tenant.languages.join(', ')}
          </Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-start">
          <Typography fontWeight="bold">Assigned Users</Typography>
          <Typography fontWeight="normal">
            {tenant.users.length + tenant.admins.length}
          </Typography>
        </Stack>
      <Box>
        <GoToTenantButton tenant={tenant} />
      </Box>
      </Stack>
    </ListItem>
  );
}
