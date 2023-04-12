import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import User from '../../types/User';

interface AdminListProps {
  users: User[];
}

export default function AdminList({ users }: AdminListProps) {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} key={user.username}>
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


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
