import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { grid } from "../../utils/MUI/gridValues";
import Tenant from "../../types/Tenant";
import tenantdata from "../TenantSettingView/testData";
import TenantListItem from "../../components/TenantList/TenantListItem/TenantListItem";
import TenantSettingItem from "../../components/TenantSettingList/TenantSettingItem";


export default function TenantTextsView() {

    const [tenants, setTenants] = useState<Tenant[]>([]);


    useEffect(() => {
        setTenants(tenantdata);
      }, []);


    return (
        <LayoutWrapper userType="admin">
            <Grid
                container
                spacing={1}
                direction="column"        
            >
            <Grid item xs={grid.fullWidth} textAlign={"center"}>
            <Typography variant="h4" >
                Tenant Settings Page
            </Typography>
            </Grid>
                <Grid item >
                    <TableContainer component={Paper} sx={{ maxHeight: '90%' }}>
                        <Table stickyHeader aria-label="collapsible table">
                            <TableHead >
                                <TableRow>
                                    <TableCell/>
                                    <TableCell align="center">Tenant Name</TableCell>
                                    <TableCell align="center">Main Tenant Language</TableCell>
                                    <TableCell align="center">Assigned Users</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                {tenants.length ? (
                                    tenants.map((tenant) => (
                                            <TenantSettingItem tenant={tenant} />
                                    ))
                                ) : (
                                    <TableRow sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                                        <p>No tenants found</p>
                                    </TableRow>
                                )}
                               
        
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        </Grid>
    </LayoutWrapper>
    )
}
