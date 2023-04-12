import { Box, Grid, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Card, CardContent, CardHeader } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { useEffect, useState } from "react";
import { grid } from "../../utils/MUI/gridValues";
import Tenant from "../../types/Tenant";
import tenantdata from "../TenantSettingView/testData";
import TenantSettingItem from "../../components/TenantSettingList/TenantSettingItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";
import UserList from "../../components/UserList/UserListItem";
import LanguagesItem from "../../components/LanguagesItem/LanguagesItem";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import DeleteTenantButton from "../../components/buttons/DeleteTenantButton/DeleteTenantButton";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import AdminListItem from "../../components/AdminListItem/AdminListItem";


export default function TenantTextsView() {
    // const [TenantSettings, setTenantSettings] = useState<Tenant>();
    const TenantSettings = tenantdata;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const navigate = useNavigate();




    function deleteuser(){
      
    }

    function createuser(){
      navigate('/CreateUser');
    }

    function createlanguage(){
      
    }

    const isAdmin = TenantSettings?.users.some((user) => user.role === 'admin');
    const isUser  = TenantSettings?.users.some((user) => user.role === 'user');



    return (
        <LayoutWrapper userType="admin">
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ display: 'block' }}>
                        Tenant Settings
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
                        <CardContent>
                            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'block' }}>
                                Data di creazione del tenant {new Date(TenantSettings?.creationDate ?? '').toLocaleDateString()}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="subtitle1" align="center" gutterBottom sx={{ display: 'block' }}>
                                La lingua principale del tenant è:  {TenantSettings?.defaultLanguage}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Card sx={{ border: 'none' }}>
                        <CardHeader
                            title="Admin Information"
                            action={
                                <IconButton
                                    onClick={() => setOpen(!open)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        >
                        </CardHeader>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <CardContent>
                                    <AdminListItem users={TenantSettings.users.filter((user) => user.role === 'admin')} />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Card sx={{ border: 'none' }} >
                        <CardHeader
                            title="Users"
                            action={
                                <IconButton
                                    onClick={() => setOpen2(!open2)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        >
                        </CardHeader>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <CardContent>
                                {isUser ? (
                                    <UserList users={TenantSettings.users.filter((user) => user.role === 'user')} />
                                ) : (
                                    <UserList users={[]} />
                                )}
                                <Paper sx={{ p: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={9}>
                                            <Typography variant="subtitle1">
                                                Vuoi aggiungere un nuovo Utente ?
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                            <Button variant="contained" color="success" onClick={createuser} >
                                                Create User
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Card sx={{ border: 'none' }} >
                        <CardHeader
                            title="Languages"
                            action={
                                <IconButton
                                    onClick={() => setOpen3(!open3)}
                                    aria-label="expand"
                                    size="small"
                                >
                                    {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        >
                        </CardHeader>
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <CardContent>
                                <LanguagesItem languages={TenantSettings?.languages ?? []} />
                                <Paper sx={{ p: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={9}>
                                            <Typography variant="subtitle1">
                                                Vuoi aggiungere una nuova lingua in cui tradurre ?
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                            <Button variant="contained" color="success" onClick={createuser}>
                                                Create new language
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </LayoutWrapper>
    )
}

