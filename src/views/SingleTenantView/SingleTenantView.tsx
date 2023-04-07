import { Typography, Grid, Card, CardContent } from '@mui/material';
import DeleteTenantButton from '../../components/buttons/DeleteTenantButton/DeleteTenantButton';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import { useParams } from 'react-router-dom';
import UserList from '../../components/UserList/UserListItem';
import tenantData from '../SuperAdminView/tenantData';
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";

export default function SingleTenantView() {
  const { id } = useParams<{ id: string }>();
  const tenant = tenantData.find((t) => id === t.id.toString());

if (!tenant) {
return (
  <LayoutWrapper userType="superadmin">
    <Grid container justifyContent="center" spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom sx={{ display: 'block' }}>
        Error
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="body1" align="center" gutterBottom sx={{ display: 'block' }}>
        Selected tenant was not found.
        </Typography>
      </Grid>
    </Grid>
  </LayoutWrapper>
);
}

const isAdmin = tenant?.users.some((user) => user.role === 'admin');

return (
<LayoutWrapper userType="superadmin">
  <Grid container spacing={2} sx={{ width: '100%' }}>
    <Grid item xs={12}>
      <Typography variant="h4" align="center" gutterBottom sx={{ display: 'block' }}>
      {tenant?.name ?? 'Unknown'}
      </Typography>
    </Grid>
    <Grid item xs={12} sx={{ textAlign: 'center' }}>
      <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'block' }}>
            Created on {new Date(tenant?.creationDate ?? '').toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sx={{ textAlign: 'center' }}>
      <Card sx={{ border: 'none' }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom sx={{ display: 'block' }}>
            Admins
          </Typography>
          {isAdmin ? (
            <UserList users={tenant.users.filter((user) => user.role === 'admin')} />
          ) : (
            <UserList users={[]} />
          )}
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sx={{ textAlign: 'center' }}>
      <Card sx={{ border: 'none' }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom sx={{ display: 'block' }}>
            Users
          </Typography>
          <UserList users={tenant?.users ?? []} />
        </CardContent>
      </Card>
    </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Grid container justifyContent={'flex-end'} gap={grid.columnSpacing}>
              <DiscardButton />  
              <DeleteTenantButton tenant={tenant} handleDelete={() => {}} />
          </Grid>
      </Grid>
  </Grid>
</LayoutWrapper>
);
}



