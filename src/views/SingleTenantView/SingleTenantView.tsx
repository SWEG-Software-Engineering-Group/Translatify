import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import DeleteTenantButton from '../../components/buttons/DeleteTenantButton/DeleteTenantButton';
import tenantsArrayForTesting from './testData'

interface SingleTenantViewProps {
  tenantId: number;
}

function SingleTenantView(props: SingleTenantViewProps) {
  const { tenantId } = props;

  // Cerca il tenant con l'id corrispondente nell'array di tenant di prova
  const tenant = tenantsArrayForTesting.find((t) => t.id === tenantId);

  if (!tenant) {
    return <div>Tenant non trovato</div>;
  }
  else{
    return (
      <>
        <Typography variant="h4" gutterBottom>
          {tenant?.name ?? 'Unknown'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Created on {new Date(tenant?.creationDate ?? '').toLocaleDateString()}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Admins
            </Typography>
            <List dense>
              {tenant?.admin.map((admin) => (
                <ListItem key={admin}>
                  <ListItemText primary={admin} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            <List>
              {tenant?.users.map((user) => (
                <ListItem key={user.username}>
                  <ListItemText primary={user.name} secondary={user.username} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <DeleteTenantButton tenant={tenant} handleDelete={() => {}} />
      </>
    );
  }
}

export default SingleTenantView;
