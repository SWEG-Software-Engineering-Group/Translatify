import { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';

interface AdminListProps {
  admins: User[];
}

export default function AdminList({ admins }: AdminListProps) {
  return (
    <Grid container spacing={grid.rowSpacing}>
      {admins.map((admin) => (
        <Grid item xs={grid.fullWidth} key={admin.username}>
          <AdminListItem admin={admin} />
        </Grid>
      ))}
    </Grid>
  );
}

interface AdminListItemProps {
  admin: User;
  isAdmin?: boolean;
}

function AdminListItem({ admin, isAdmin = false }: AdminListItemProps) {
  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={grid.rowSpacing} alignItems="center" justifyContent="center" >
          <Grid item xs={9} alignItems="center">
            <Typography variant="subtitle1">
              Username: {admin.username}
            </Typography>
            <Typography variant="subtitle1">Name: {admin.name}</Typography>
            <Typography variant="subtitle1">
              Surname: {admin.surname}
            </Typography>
            <Typography variant="subtitle1">Email: {admin.email}</Typography>
            {isAdmin && (
              <Typography variant="subtitle1">Role: {admin.role}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

    </div>
  );
}
