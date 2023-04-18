import { useState } from "react";
import Text from "../../../types/Text";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MuiAlert from '@mui/material/Alert';

interface AcceptTranslationButtonProps {
    handleAccept: () => void;
    translation?: Text;
    disabled?: boolean;
}

export default function AcceptTranslationButton(props: AcceptTranslationButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [confirmAccept, setConfirmAccept] = useState<boolean>(false);

    const handleApproveTranslation = () => {
        props.handleAccept();
        setSnackbarOpen(true);
        setConfirmAccept(false);
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    const handleOpenDialog = () => {
      setConfirmAccept(true);
    };
  
    const handleCloseDialog = () => {
      setConfirmAccept(false);
    };
    
    return (
      <>    
        {!confirmAccept && (
          <IconButton aria-label="Approve the translation" onClick={handleOpenDialog} disabled={props.disabled}>
            <ThumbUpIcon />
          </IconButton>
        )} 
        {
          confirmAccept && (
            <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Accept translation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to accept {props.translation?.id}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>No</Button>
              <Button onClick={handleApproveTranslation}>Yes</Button>
            </DialogActions>
          </Dialog>
          )
        }
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} onClose={handleSnackbarClose} variant="filled" severity="success">
            Translation accepted successfully
          </MuiAlert>
        </Snackbar>
      </>
    )
}