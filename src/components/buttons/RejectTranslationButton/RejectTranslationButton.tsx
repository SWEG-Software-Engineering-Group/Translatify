import { useState } from "react";
import Text from "../../../types/Text";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, TextField } from "@mui/material";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MuiAlert from '@mui/material/Alert';
import { putData } from "../../../services/axios/axiosFunctions";
import { useAuth } from "../../../hooks/useAuth";

interface RejectTranslationButtonProps {
  handleReject: (feedback?: string) => void;
  translation?: Text;
  disabled?: boolean;
}

export default function RejectTranslationButton(props: RejectTranslationButtonProps) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [confirmReject, setConfirmReject] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const { tenant } = useAuth();

  const handleRejectTranslation = (feedback?: string) => {
    const { id, language, category } = props.translation || {};
    const url = `${process.env.REACT_APP_API_KEY}/text/${tenant.id}/${language}/${category}/${id}/rejectTranslation`;
    const data = { feedback };
    putData(url, data)
      .then(res => {
        setSnackbarOpen(true);
        setConfirmReject(false);
        props.handleReject(feedback);
      })
      .catch(err => {
        setSnackbarOpen(true);
        setConfirmReject(false);
        console.error(err);
      })
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDialog = () => {
    setConfirmReject(true);
  };

  const handleCloseDialog = () => {
    setConfirmReject(false);
    setFeedback("");
  };

  return (
    <>
      {!confirmReject && (
        <IconButton aria-label="Reject the translation" onClick={handleOpenDialog} disabled={props.disabled}>
          <ThumbDownIcon />
        </IconButton>
      )}
      {confirmReject && (
        <Dialog open onClose={handleCloseDialog}>
          <DialogTitle>Reject translation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to reject {props.translation?.id}? You can provide optional feedback.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Feedback"
              fullWidth
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleRejectTranslation(feedback)}>Reject</Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} onClose={handleSnackbarClose} variant="filled" severity="success">
          Translation rejected successfully
        </MuiAlert>
      </Snackbar>
    </>
  )
}
