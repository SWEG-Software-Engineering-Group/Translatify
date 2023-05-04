import { useState } from "react";
import TextCategory from "../../../types/TextCategory";
import { Dialog, DialogTitle, DialogActions, Button, Snackbar, DialogContent, DialogContentText, IconButton } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData } from "../../../services/axios/axiosFunctions";
import { useAuth } from "../../../hooks/useAuth";

interface DeleteTextCategoryButtonProps {
    handleDelete: (cat: string) => void;
    category?: TextCategory;
    categoryId : string;
    disabled?: boolean;
}
export default function DeleteTextCategoryButton(props: DeleteTextCategoryButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);    
    const tenant = useAuth().tenant;
  
    const handleDelete = () => {
      setDisableSubmit(true);
      if(props.category){
        deleteData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/${props.category?.idCategory}/category`)
        .then(res => {
          setDisableSubmit(false);
          props.handleDelete(props.categoryId);
        })
        .catch(err => {
          setDisableSubmit(false);
          setSnackbarErrorOpen(true);
        });  

      }
        //setConfirmDelete(false); //works as if it was the isDialogOpen used in other views, to open and close the modal
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
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
              <Button disabled={disableSubmit} onClick={handleDelete}>Yes</Button>
            </DialogActions>
          </Dialog>
         
          )
        }
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} onClose={handleSnackbarClose} variant="filled" severity="success">
            Category deleted successfully
          </MuiAlert>
        </Snackbar>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      </>
    )
}