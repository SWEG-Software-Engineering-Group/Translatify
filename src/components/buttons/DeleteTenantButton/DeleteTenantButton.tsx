import { Button, Snackbar } from '@mui/material';
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
      props.handleDelete();
      setShowSuccess(true);
    }
  };  

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      {!confirmDelete && (
        <Button variant="contained" color="primary" onClick={() => setConfirmDelete(true)} disabled={props.disabled}>
          Delete {props.tenant?.name}
        </Button>
      )}
      {confirmDelete && (
        <>
          <p>Are you sure you want to delete this tenant?</p>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setConfirmDelete(false)}>
            No
          </Button>
        </>
      )}
      <Snackbar open={showSuccess} message="Tenant deleted successfully" autoHideDuration={3000} onClose={handleCloseSnackbar} />
    </>
  );
}
