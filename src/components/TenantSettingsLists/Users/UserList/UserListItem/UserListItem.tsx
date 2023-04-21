import {useState} from 'react'
import User from '../../../../../types/User';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography } from '@mui/material';


interface UserListItemProps {
    user: User;
    handleDelete: (user : User) => void;
  }
  

export default function UserListItem({ user, handleDelete}: UserListItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  
    const handleSnackbarClose = () => {
      setIsSnackbarOpen(false);
    };
  
    const handleDeleteUser = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      //delete API then...
      handleDelete(user);
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
              <Typography variant="subtitle1">Role: {user.group}</Typography>
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
  