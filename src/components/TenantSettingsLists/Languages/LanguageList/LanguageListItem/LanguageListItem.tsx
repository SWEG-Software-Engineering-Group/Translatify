import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography, TextField} from '@mui/material';
import {useState} from 'react'
import { deleteData } from '../../../../../services/axios/axiosFunctions';
import { useAuth } from '../../../../../hooks/useAuth';

interface LanguageListItemProps {
    language: string;
    handleDelete: (lang : string) => void;
  }
  
export default function LanguageListItem({ language, handleDelete }: LanguageListItemProps) {
    const {tenant} = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  
    const handleSnackbarClose = () => {
      setIsSnackbarOpen(false);
    };
  
    const handleDeleteLanguage = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      deleteData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/removeLanguages`, {Language : language})
      .then(res => {
        handleDelete(language);
        setIsSnackbarOpen(true);
        setIsDialogOpen(false);
      })
      .catch( err => {
        alert('something went wrong, try again later');
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
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove the {language} language?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={`${language} language removed`}
        />
      </div>
    );
  }