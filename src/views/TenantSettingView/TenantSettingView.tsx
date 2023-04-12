import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import {Grid, Typography, Card, CardContent} from "@mui/material";
import { useState } from "react";
import { grid } from "../../utils/MUI/gridValues";
import tenantdata from "../TenantSettingView/testData";
import LanguageList from "../../components/TenantSettingsLists/UserList/LanguageList";
import AdminInfoList from "../../components/TenantSettingsLists/UserList/AdminInfoList";
import User from "../../types/User";
import UserList from "../../components/TenantSettingsLists/UserList/UserList";

export default function TenantTextsView() {
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
        <LayoutWrapper userType="admin">
            <Typography variant="h4" align="center" gutterBottom sx={{ display: 'block' }}>
                Tenant Settings
            </Typography>
            <Grid container rowSpacing={grid.rowSpacing} direction='column' wrap="nowrap">    
                <Grid item xs={grid.fullWidth} sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:"space-around" }}>                    
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                        Creation Date {new Date(TenantSettings?.creationDate ?? '').toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'inline' }}>
                        Default Language {TenantSettings?.defaultLanguage}
                    </Typography>
                </Grid>
                <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }}>
                    <AdminInfoList admins={getAdmins()}/>
                </Grid>
                <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center'}}>
                    <UserList users={users} />
                </Grid>
                <Grid item xs={grid.fullWidth} sx={{ textAlign: 'center' }} rowSpacing={grid.rowSpacing}>
                    <LanguageList languages={languages}/>
                </Grid>
            </Grid>
        </LayoutWrapper>
    )
}

