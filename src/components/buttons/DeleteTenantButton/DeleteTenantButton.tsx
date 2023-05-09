import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import Tenant from '../../../types/Tenant';
import { useState } from 'react';
import { deleteData } from '../../../services/axios/axiosFunctions';
import MuiAlert from '@mui/material/Alert';

interface DeleteTenantButtonProps {
  handleDelete: () => void;
  tenant?: Tenant;
  tenantId : string; 
  disabled?: boolean;
}

export default function DeleteTenantButton(props: DeleteTenantButtonProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  
  const handleDelete = () => {
    setDisableSubmit(true);
    if (props.tenant) {
    deleteData(`${process.env.REACT_APP_API_KEY}/tenant/${props.tenantId}`)
    .then(res => {
      setSnackbarOpen(true);
      setTimeout(()=>setDisableSubmit(false), 1000);
      props.handleDelete();
    })
    .catch(err => {
      setDisableSubmit(false);
      setSnackbarErrorOpen(true);
    });    
    }
  };

  const handleOpenDialog = () => {
    setConfirmDelete(true);
  };

  const handleCloseDialog = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      {!confirmDelete && (
        <Button variant="contained" color="error" onClick={handleOpenDialog} disabled={props.disabled} sx={{flexGrow:1}}>
          Delete {props.tenant?.tenantName}
        </Button>
      )}
      {confirmDelete && (
        <Dialog open onClose={handleCloseDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {props.tenant?.tenantName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button disabled={disableSubmit} onClick={handleDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
          Tenant deleted successfully
        </MuiAlert>
      </Snackbar>
      <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
          Something went wrong, try again later
        </MuiAlert>
      </Snackbar>
    </>
  );
}
