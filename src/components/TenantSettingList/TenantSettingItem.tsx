import { Box, Button, Collapse, IconButton, Link, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Tenant from '../../types/Tenant';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import convertTextState from '../../utils/Text/convertTextState';
import TextState from '../../types/TextState';

export interface TenantListItemProps {
  tenant: Tenant;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {
    
    const [open, setOpen] = React.useState(false);

    function deleteuser(){
      
    }

    function createuser(){
      
    }

    function createlanguage(){
      
    }
  

  return ( 

      <React.Fragment key={tenant.id}>
          <TableRow  key={tenant.id}>
              <TableCell  align="center" sx={{width: '25%'}} >
                  <IconButton
                      onClick={() => setOpen(!open)}
                  >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
              </TableCell>
              <TableCell  align="center" sx={{width: '25%'}}>{tenant.name}</TableCell>
              <TableCell  align="center" sx={{width: '25%'}}>{tenant.defaultLanguage}</TableCell>
              <TableCell  align="center" sx={{width: '25%'}}>{tenant.users.length}</TableCell>
          </TableRow >
          <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%', fontWeight: 'bold' }}>Users Settings</TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
          </TableRow>
          {/* buttons    */}
          {/* <Box sx={{ margin: 1 }}> */}
          {tenant.users.length ? (
              tenant.users.map((user) => (
                  <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
                          <TableCell align="center" sx={{width: '25%'}}></TableCell>
                          <TableCell align="center" sx={{width: '25%'}}>{user.name}</TableCell>
                          <TableCell align="center" sx={{width: '25%'}}><Button key='deleteuser' onClick={deleteuser} color='error' variant='contained'>Delete User</Button></TableCell>
                          <TableCell align="center" sx={{width: '25%'}}></TableCell>
                  </TableRow>
              ))
          ) : (
              <TableRow sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <p>No users found</p>
              </TableRow>

          )}
          <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%', fontWeight: 'bold' }}>Vuoi inserire un nuovo utente ?</TableCell>
              <TableCell align="center" sx={{width: '25%'}}><Button key='deleteuser' onClick={createuser} color='success' variant='contained'>Create User</Button></TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
          </TableRow>
          <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%', fontWeight: 'bold' }}>Language Settings</TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
          </TableRow>
          {tenant.languages.length ? (
              tenant.languages.map((languages) => (
                  <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
                          <TableCell align="center" sx={{width: '25%'}}></TableCell>
                          <TableCell align="center" sx={{width: '25%'}}>{languages}</TableCell>
                          <TableCell align="center" sx={{width: '25%'}}><Button key='deleteuser' onClick={deleteuser} color='error' variant='contained'>Delete Language</Button></TableCell>
                          <TableCell align="center" sx={{width: '25%'}}></TableCell>
                  </TableRow>
              ))
          ) : (
              <TableRow sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <p>No languages found</p>
              </TableRow>
          )}
          <TableRow sx={{ visibility: open ? 'visible' : 'collapse' }}>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
              <TableCell align="center" sx={{ width: '25%', fontWeight: 'bold' }}>Vuoi inserire una nuova lingua da tradurre ?</TableCell>
              <TableCell align="center" sx={{ width: '25%' }}><Button key='deleteuser' onClick={createlanguage} color='success' variant='contained'>Create Language</Button></TableCell>
              <TableCell align="center" sx={{ width: '25%' }}></TableCell>
          </TableRow>
      </React.Fragment>

  );
}
