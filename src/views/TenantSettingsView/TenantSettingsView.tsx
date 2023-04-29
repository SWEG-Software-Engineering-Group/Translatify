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
    // const [TenantSettings, setTenantSettings] = useState<Tenant>();
    const {tenant} = useAuth();


    return (
        <PrivateRoute allowedUsers={['admin']}>
            <LayoutWrapper userType="admin">
                <PageTitle title='Tenant Settings'/>
                <Grid container rowSpacing={grid.rowSpacing} direction='column' wrap="nowrap">
                    <Grid item xs={grid.fullWidth} sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:"space-around" }}>
                        <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                            Created in {new Date(tenant?.creationDate ?? '').toLocaleDateString()}
                        </Typography>
                        <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                            TenantId: {tenant.id}
                        </Typography>
                        <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                            Default Language: {tenant?.defaultLanguage}
                        </Typography>
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
                        <AdminsInfo adminsIds={tenant.admins}/>
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center'}}>
                        <Users usersIds={tenant.users} />
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }} rowSpacing={grid.rowSpacing}>
                        <Languages/>
                    </Grid>
                </Grid>
            </LayoutWrapper>
        </PrivateRoute>
    )
}

