import { useState } from "react";
import Text from "../../../types/Text";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar } from "@mui/material";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MuiAlert from '@mui/material/Alert';

interface RejectTranslationButtonProps {
    handleReject: () => void;
    translation?: Text;
    disabled?: boolean;
}

export default function RejectTranslationButton(props: RejectTranslationButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [confirmReject, setConfirmReject] = useState<boolean>(false);
    
    const handleRejectTranslation = () => {
        props.handleReject();
        setSnackbarOpen(true);
        setConfirmReject(false);
    };
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    const handleOpenDialog = () => {
      setConfirmReject(true);
    };
  
    const handleCloseDialog = () => {
      setConfirmReject(false);
    };
    
    return (
      <>    
        {!confirmReject && (
          <IconButton aria-label="Reject the translation" onClick={handleOpenDialog} disabled={props.disabled}>
            <ThumbDownIcon />
          </IconButton>
        )} 
        {
          confirmReject && (
            <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Reject translation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to reject {props.translation?.id}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>No</Button>
              <Button onClick={handleRejectTranslation}>Yes</Button>
            </DialogActions>
          </Dialog>
         
          )
        }
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} onClose={handleSnackbarClose} variant="filled" severity="success">
            Translation rejected successfully
          </MuiAlert>
        </Snackbar>
      </>
    )
}
