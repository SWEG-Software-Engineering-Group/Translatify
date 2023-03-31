import { Typography, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import DeleteTenantButton from '../../components/buttons/DeleteTenantButton/DeleteTenantButton';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import tenantsArrayForTesting from './testData';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

function SingleTenantView() {
  const { id } = useParams<{ id: string }>(); // otteniamo il parametro id dall'URL
  const navigate = useNavigate();

  const tenant = tenantsArrayForTesting.find((t) => id === t.id.toString());

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

  return (
    <LayoutWrapper userType="superadmin">
      <Grid container justifyContent="center" spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom sx={{ display: 'block' }}>
            {tenant?.name ?? 'Unknown'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'block' }}>
            Created on {new Date(tenant?.creationDate ?? '').toLocaleDateString()}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{ display: 'block' }}>
            Admins
          </Typography>
          <List dense sx={{ display: 'block' }}>
            {tenant?.admin.map((admin) => (
              <ListItem key={admin} sx={{ display: 'block' }}>
                <ListItemText primary={admin} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" align="center" gutterBottom sx={{ display: 'block' }}>
            Users
          </Typography>
          <List sx={{ display: 'block' }}>
            {tenant?.users.map((user) => (
              <ListItem key={user.username} sx={{ display: 'block' }}>
                <ListItemText primary={user.name} secondary={user.username} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <DeleteTenantButton 
            tenant={tenant} 
            handleDelete={() => {} } 
            />
          <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/SuperAdmin");
          }}
          fullWidth
          sx={{ mt: 2, mr: 2 }}
        >
        Cancel
        </Button>
        </Grid>
      </Grid>
    </LayoutWrapper>
  );
}

export default SingleTenantView;
