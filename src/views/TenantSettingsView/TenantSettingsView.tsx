import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { Grid, Typography } from "@mui/material";
import { grid } from "../../utils/MUI/gridValues";
import Languages from "../../components/TenantSettingsLists/Languages/Languages";
import AdminsInfo from "../../components/TenantSettingsLists/AdminsInfo/AdminsInfo";
import Users from "../../components/TenantSettingsLists/Users/Users";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";

export default function TenantSettingView() {
  const { tenant } = useAuth();

  const creationDate = tenant ? new Date(tenant.creationDate) : null;
  const tenantId = tenant ? tenant.id : null;
  const defaultLanguage = tenant ? tenant.defaultLanguage : null;

  return (
    <PrivateRoute allowedUsers={['admin']}>
      <LayoutWrapper userType="admin">
        <PageTitle title='Tenant Settings'/>
        <Grid container rowSpacing={grid.rowSpacing} direction='column' wrap="nowrap">
          <Grid item xs={grid.fullWidth} sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:"space-around" }}>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
              Created in {creationDate ? creationDate.toLocaleDateString() : 'Date not found'}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
              TenantId: {tenantId ? tenantId : 'Tenant not found'}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
              Default Language: {defaultLanguage ? defaultLanguage : 'Default language not found'}
            </Typography>
          </Grid>
          <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
            <AdminsInfo adminsIds={tenant?.admins}/>
          </Grid>
          <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center'}}>
            <Users usersIds={tenant?.users} />
          </Grid>
          <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }} rowSpacing={grid.rowSpacing}>
            <Languages/>
          </Grid>
        </Grid>
      </LayoutWrapper>
    </PrivateRoute>
  );
}
