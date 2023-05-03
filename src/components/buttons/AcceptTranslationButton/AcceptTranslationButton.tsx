import { useState } from "react";
import Text from "../../../types/Text";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MuiAlert from '@mui/material/Alert';
import { putData } from "../../../services/axios/axiosFunctions";
import { useAuth } from "../../../hooks/useAuth";

interface AcceptTranslationButtonProps {
    handleAccept: () => void;
    translation?: Text;
    disabled?: boolean;
}

export default function AcceptTranslationButton(props: AcceptTranslationButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [confirmAccept, setConfirmAccept] = useState<boolean>(false);
    const { tenant } = useAuth();

    const handleApproveTranslation = () => {
      if (props.translation) {
        const { title, language, category } = props.translation || {};
        const url = `${process.env.REACT_APP_API_KEY}/text/${tenant.id}/${language}/${category}/${title}/approveTranslation`;
        const data = { approved: true };
        putData(url, data)
          .then(() => {
            props.handleAccept();
            setSnackbarOpen(true);
            setConfirmAccept(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
                Are you sure you want to accept {props.translation?.title}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>No</Button>
              <Button onClick={handleApproveTranslation}>Yes</Button>
            </DialogActions>
          </Dialog>
          )
        }
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} onClose={handleSnackbarClose} variant="filled" severity="success">
            Translation accepted successfully
          </MuiAlert>
        </Snackbar>
      </>
    )
}