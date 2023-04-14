import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import Tenant from '../../../types/Tenant';
import { useState } from 'react';

interface DeleteTenantButtonProps {
  handleDelete: () => void;
  tenant?: Tenant;
  disabled?: boolean;
}

export default function DeleteTenantButton(props: DeleteTenantButtonProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = () => {
    if (props.tenant) {
      // const response = await fetch(`/api/tenants/${props.tenant.id}`, { method: 'DELETE' });
      /*
    if (response.ok) {
      props.handleDelete();
      setShowSuccess(true);
      setConfirmDelete(false); // qui chiudo il modale
      } else {
        throw new Error('Failed to delete tenant');
      }
      */
      props.handleDelete();
      setShowSuccess(true);
      setConfirmDelete(false); // qui chiudo il modale
    }
  };

  

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
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
            <Button onClick={handleDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar open={showSuccess} message="Tenant deleted successfully" autoHideDuration={3000} onClose={handleCloseSnackbar} />
    </>
  );
}
