import {useState} from 'react'
import User from '../../../../../types/User';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

interface UserListItemProps {
    user: User;
    handleDelete: (user : User) => void;
  }
  

export default function UserListItem({ user, handleDelete}: UserListItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);    

    const handleDeleteUser = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      setDisableSubmit(true);
      //delete API then...
      setDisableSubmit(false);
      setIsDialogOpen(false);
      handleDelete(user);
      //catch
      // setDisableSubmit(false);
      // setSnackbarErrorOpen(true);
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
            <Button disabled={disableSubmit} onClick={handleConfirmDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }  