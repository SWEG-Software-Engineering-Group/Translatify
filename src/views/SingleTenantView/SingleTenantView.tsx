import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import DeleteTenantButton from '../../components/buttons/DeleteTenantButton/DeleteTenantButton';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import { useParams } from 'react-router-dom';
import UserList from '../../components/TenantSettingsLists/Users/UserList/UserList';
import tenantData from '../SuperAdminView/tenantData';
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";
import PageTitle from '../../components/PageTitle/PageTitle';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import { useNavigate } from 'react-router-dom';

export default function SingleTenantView() {
  const { id } = useParams<{ id: string }>();
  const tenant = tenantData.find((t) => id === t.id.toString());
  const navigate = useNavigate();

  function createUser(){
    navigate('/CreateUser');
  }

if (!tenant) {
return (
  <LayoutWrapper userType="superadmin">
    <Grid container justifyContent="center" spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={grid.fullWidth}>
      <PageTitle title='Error'/>
      </Grid>
      <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
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
<PrivateRoute allowedUsers={['superadmin']}>
  <LayoutWrapper userType="superadmin">
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={grid.fullWidth}>
        <PageTitle title={tenant?.name ?? 'Unknown'}/>
      </Grid>
      <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
        <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'block' }}>
              Created on {new Date(tenant?.creationDate ?? '').toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  
      <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
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
            <Button
              variant="contained"
              color="success"
              onClick={createUser}
              fullWidth
              sx={{marginTop:grid.rowSpacing}}
            >
              Add Admin
            </Button>
          </CardContent>
        </Card>
      </Grid>
  
      <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
        <Card sx={{ border: 'none' }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom sx={{ display: 'block' }}>
              Users
            </Typography>
            <UserList users={tenant?.users ?? []} />
            <Button
              variant="contained"
              color="success"
              onClick={createUser}
              fullWidth
              sx={{marginTop:grid.rowSpacing}}
            >
              Add User
            </Button>
          </CardContent>
        </Card>
      </Grid>
  
        <Grid item xs={grid.fullWidth}>
            <Grid container direction='row' wrap='nowrap' justifyContent={'space-between'} gap={grid.columnSpacing}>
                <DiscardButton />
                <DeleteTenantButton tenant={tenant} handleDelete={() => {}} />
            </Grid>
        </Grid>
    </Grid>
  </LayoutWrapper>
</PrivateRoute>
);
}



