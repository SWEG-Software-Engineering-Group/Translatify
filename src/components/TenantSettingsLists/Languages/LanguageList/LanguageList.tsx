import { useState } from 'react';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Snackbar,Typography} from '@mui/material';

interface LanguagesListProps {
    languages: string[];
}

  export default function LanguageList({ languages }: LanguagesListProps) {
    return (
      <Grid container spacing={2}>
        {languages.map((language) => (
          <Grid item xs={12} key={language}>
            <LanguageListItem language={language} />
          </Grid>
        ))}
      </Grid>
    );
  }

  interface LanguageListItemProps {
    language: String;
  }
  
  function LanguageListItem({ language }: LanguageListItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  
    const handleSnackbarClose = () => {
      setIsSnackbarOpen(false);
    };
  
    const handleDeleteLanguage = () => {
      setIsDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      setIsSnackbarOpen(true);
      setIsDialogOpen(false);
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
  
