import {useState} from 'react'
import User from '../../../../../types/User';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { deleteData } from '../../../../../services/axios/axiosFunctions';

interface UserListItemProps {
  user: User;
  handleDelete: (user : User) => void;
}
  
export default function UserListItem(props: UserListItemProps){
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);    

    const handleDeleteUser = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      setDisableSubmit(true);
      if(props.user){
          deleteData(`${process.env.REACT_APP_API_KEY}/user/${props.user?.username}/delete`)
            .then(res => {
              setDisableSubmit(false)
              props.handleDelete(props.user);
            }
          )
          .catch(err => {
            setDisableSubmit(false);
            setSnackbarErrorOpen(true);
          }
        );
      }
    };
  
    return (
      <div>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <Typography variant="subtitle1">Name: {props.user.name}</Typography>
              <Typography variant="subtitle1">
                Surname: {props.user.surname}
              </Typography>
              <Typography variant="subtitle1">Email: {props.user.email}</Typography>
              <Typography variant="subtitle1">Role: {props.user.group}</Typography>
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
              Are you sure you want to delete user {props.user.username}?
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