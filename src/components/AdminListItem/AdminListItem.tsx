import { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import User from '../../types/User';
import { grid } from '../../utils/MUI/gridValues';

interface AdminListProps {
  users: User[];
}

export default function AdminList({ users }: AdminListProps) {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={grid.fullWidth} key={user.username}>
          <AdminListItem user={user} />
        </Grid>
      ))}
    </Grid>
  );
}

interface AdminListItemProps {
  user: User;
  isAdmin?: boolean;
}

function AdminListItem({ user, isAdmin = false }: AdminListItemProps) {
  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" >
          <Grid item xs={9} alignItems="center">
            <Typography variant="subtitle1">
              Username: {user.username}
            </Typography>
            <Typography variant="subtitle1">Name: {user.name}</Typography>
            <Typography variant="subtitle1">
              Surname: {user.surname}
            </Typography>
            <Typography variant="subtitle1">Email: {user.email}</Typography>
            {isAdmin && (
              <Typography variant="subtitle1">Role: {user.role}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

    </div>
  );
}
