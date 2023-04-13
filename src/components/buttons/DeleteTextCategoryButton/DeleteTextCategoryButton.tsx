import { useState } from "react";
import TextCategory from "../../../types/TextCategory";
import { Dialog, DialogTitle, DialogActions, Button, Snackbar, DialogContent, DialogContentText, IconButton } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteTextCategoryButtonProps {
    handleDelete: () => void;
    category?: TextCategory;
    disabled?: boolean;
}
export default function DeleteTextCategoryButton(props: DeleteTextCategoryButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
  
    const handleDelete = () => {
        props.handleDelete();
        setSnackbarOpen(true);
        setConfirmDelete(false);
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(true);
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
          <IconButton aria-label="Delete the text category" onClick={handleOpenDialog} disabled={props.disabled}>
            <DeleteIcon />
          </IconButton>
        )} 
        {
          confirmDelete && (
            <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {props.category?.idCategory}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>No</Button>
              <Button onClick={handleDelete}>Yes</Button>
            </DialogActions>
          </Dialog>
         
          )
        }
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            Category delete successfully
          </MuiAlert>
        </Snackbar>
      </>
    )
}