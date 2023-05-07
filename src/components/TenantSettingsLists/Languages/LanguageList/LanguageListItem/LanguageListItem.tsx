import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useState} from 'react'
import { deleteData } from '../../../../../services/axios/axiosFunctions';
import { useAuth } from '../../../../../hooks/useAuth';

interface LanguageListItemProps {
    language: string;
    handleDelete: (lang : string) => void;
}
  
export default function LanguageListItem({ language, handleDelete }: LanguageListItemProps) {
    const {tenant} = useAuth() ?? {};
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);    
  
    const handleDeleteLanguage = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setDisableSubmit(true);
      deleteData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant?.id}/language/${language}`)
      .then(res => {
        setDisableSubmit(false);
        setIsDialogOpen(false);
        handleDelete(language);
      })
      .catch( err => {
        setSnackbarErrorOpen(true);
        setDisableSubmit(false);
      })
    };

    return (
      <div>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                Language: {language}
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'right' }}>
              <Button variant="contained" color="error" onClick={handleDeleteLanguage}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <form onSubmit={(e) => handleConfirmDelete(e)}>
            <DialogTitle>Confirm Language Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove the {language} language?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button disabled={disableSubmit} type='submit' color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }