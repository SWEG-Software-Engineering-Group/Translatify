import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { grid } from "../../utils/MUI/gridValues";

export default function TenantTextsView() {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

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
                                    <TableCell>Tenant Name</TableCell>
                                    <TableCell align="center">Main Tenant Language</TableCell>
                                    <TableCell align="center">Assigned Users</TableCell>
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
                                        <TableCell align="center">English</TableCell>
                                        <TableCell align="center">No users assigned</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography align="center" variant="h6" gutterBottom component="div">
                                                        User list and buttons to add languages to translate
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
                                        <TableCell align="center">French</TableCell>
                                        <TableCell align="center">Assigned Users: 2 </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography align="center" variant="h6" gutterBottom component="div">
                                                    User list and buttons to add languages to translate
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
                                        <TableCell align="center">Spanish</TableCell>
                                        <TableCell align="center">Assigned Users: 1 </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open3} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography align="center" variant="h6" gutterBottom component="div">
                                                    User list and buttons to add languages to translate
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
        </Grid>
    </LayoutWrapper>
    )
}
