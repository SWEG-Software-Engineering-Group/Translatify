import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { grid } from "../../utils/MUI/gridValues";
import tenantdata from "./testData";
import Languages from "../../components/TenantSettingsLists/Languages/Languages";
import AdminsInfo from "../../components/TenantSettingsLists/AdminsInfo/AdminsInfo";
import User from "../../types/User";
import Users from "../../components/TenantSettingsLists/Users/Users";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

export default function TenantSettingView() {
    // const [TenantSettings, setTenantSettings] = useState<Tenant>();
    const TenantSettings = tenantdata;
    const [languages, setLanguages] = useState<string[]>(TenantSettings.languages);
    const [users, setUsers] = useState<User[]>(getUsers());
    

    function getAdmins(){
        return TenantSettings.users.filter((user) => user.role === 'admin');
    }

    function getUsers(){
        return TenantSettings.users.filter((user) => user.role === 'user');
    }

    return (
        <PrivateRoute allowedUsers={['admin']}>
            <LayoutWrapper userType="admin">
                <PageTitle title='Tenant Settings'/>
                <Grid container rowSpacing={grid.rowSpacing} direction='column' wrap="nowrap">
                    <Grid item xs={grid.fullWidth} sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:"space-around" }}>
                        <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                            Created in {new Date(TenantSettings?.creationDate ?? '').toLocaleDateString()}
                        </Typography>
                        <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                            Default Language: {TenantSettings?.defaultLanguage}
                        </Typography>
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
                        <AdminsInfo admins={getAdmins()}/>
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center'}}>
                        <Users users={users} />
                    </Grid>
                    <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }} rowSpacing={grid.rowSpacing}>
                        <Languages languages={languages} onChange={(newLang : string) => setLanguages([...languages, newLang])}/>
                    </Grid>
                </Grid>
            </LayoutWrapper>
        </PrivateRoute>
    )
}

