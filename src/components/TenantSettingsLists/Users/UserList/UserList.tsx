import { useState } from 'react';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <Grid container spacing={grid.rowSpacing}>
      {users.map((user) => {
        console.log(user);
        // return <Grid item xs={grid.fullWidth} key={user.username}>
        return <Grid item xs={grid.fullWidth} key={JSON.stringify(user)}>
          <UserListItem user={user} />
        </Grid>}
      )}
    </Grid>
  );
}

interface UserListItemProps {
  user: User;
  isAdmin?: boolean;
}

function UserListItem({ user, isAdmin = false }: UserListItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleDeleteUser = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsSnackbarOpen(true);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
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
          <Grid item xs={3} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="error" onClick={handleDeleteUser}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user {user.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`User ${user.username} deleted`}
      />
    </div>
  );
}
