import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TenantTextsView() {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);


    //HOOKS


    //LOGIC

    //UI
    return (
        <LayoutWrapper userType="admin">
        <Typography> Tenants Settings Page </Typography>
            <Grid item  >
                <TableContainer component={Paper} sx={{ maxHeight: '90%' }}>
                    <Table stickyHeader aria-label="collapsible table">
                        <TableHead >
                            <TableRow>
                                <TableCell />
                                <TableCell  >Nome Tenant </TableCell>
                                <TableCell align="center">Lingua Principale Tenant</TableCell>
                                <TableCell align="center">Utenti assegnati</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <React.Fragment >
                                <TableRow >
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => setOpen(!open)}>
                                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell >Tenant 1 </TableCell>
                                    <TableCell align="center">Inglese</TableCell>
                                    <TableCell align="center">Nessuno </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography align="center" variant="h6" gutterBottom component="div">
                                                    lista degli utenti e tasti aggiunta lingue da tradurre
                                                </Typography> 
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => setOpen2(!open2)}>
                                            {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell >Tenant 2 </TableCell>
                                    <TableCell align="center">Francese</TableCell>
                                    <TableCell align="center">Utenti assegnati: 2 </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={open2} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography align="center" variant="h6" gutterBottom component="div">
                                                    lista degli utenti e tasti aggiunta lingue da tradurre
                                                </Typography> 
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => setOpen3(!open3)}>
                                            {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell >Tenant 3 </TableCell>
                                    <TableCell align="center">Spagnolo</TableCell>
                                    <TableCell align="center">Utenti assegnati: 1 </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={open3} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography align="center" variant="h6" gutterBottom component="div">
                                                    lista degli utenti e tasti aggiunta lingue da tradurre
                                                </Typography> 
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </LayoutWrapper>
    )
}
