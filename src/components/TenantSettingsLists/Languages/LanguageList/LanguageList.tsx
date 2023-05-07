import { useState } from 'react';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Snackbar, TextField} from '@mui/material';
import { grid } from '../../../../utils/MUI/gridValues';
import LanguageListItem from './LanguageListItem/LanguageListItem';
import { postData } from '../../../../services/axios/axiosFunctions';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../../../../hooks/useAuth';

  interface LanguagesListProps {
      oldLanguages: string[];
  }

  export default function LanguageList({oldLanguages} : LanguagesListProps) {
    const {tenant} = useAuth() ?? {};
    const [openModal, toggleOpenModal] = useState<boolean>(false);
    const [dialogValue, setDialogValue] = useState<string>('');
    const [languages, setLanguages] = useState<string[]>(oldLanguages);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);    
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();      
      if (tenant && dialogValue.trim() !== '' && dialogValue.trim() !== '-' && dialogValue.trim().toLowerCase() !== tenant.defaultLanguage.toLowerCase()) {
        if(!languages.some((language) => language.toLowerCase() === (dialogValue.toLowerCase()))){
          setDisableSubmit(true);
          postData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/addLanguage`, {Language: dialogValue})
          .then(res => {
            setSnackbarOpen(true);
            setLanguages([...languages, dialogValue]);
            handleClose();
            setDisableSubmit(false);
          })
          .catch(err => {
            setSnackbarErrorOpen(true);
            setDisableSubmit(false);
          }
          )
        }
        else{
            setSnackbarOpen(true);
        }
        setDisableSubmit(false);
      }
      else{
        setSnackbarErrorOpen(true);
      }
  };
    const handleClose = () => {
      setDialogValue('');
      toggleOpenModal(false);
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleDelete = (lang : string) => {
      setLanguages(languages.filter((language) => language !== lang));
    };

    return (
      <>
      <Grid container spacing={2}>
        {languages && languages.length > 0 ? (
          languages.map((language) => (
            <Grid item xs={12} key={language}>
              <LanguageListItem
                language={language}
                handleDelete={(lang: string) => handleDelete(lang)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No languages found</p>
          </Grid>
        )}
      </Grid>
        <Dialog open={openModal} onClose={handleCancel}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add a new language</DialogTitle>
            <DialogContent>
            <DialogContentText>
                This is a new language, are you sure you want to add it?
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue}
            onChange={(event) =>
                setDialogValue(event.target.value)
            }
            label="New language"
            type="text"
            variant="standard"
            />                   
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button disabled={disableSubmit} type="submit">Add</Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
            Language added successfully
          </MuiAlert>
        </Snackbar>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      <Button variant="contained" color="success" onClick={() => toggleOpenModal(true)} fullWidth sx={{marginTop:grid.rowSpacing}}>
        Add new language
      </Button>
      </>      
    );
  }
  
