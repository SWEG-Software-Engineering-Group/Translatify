import { useState } from 'react';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Snackbar, TextField} from '@mui/material';
import { grid } from '../../../../utils/MUI/gridValues';
import LanguageListItem from './LanguageListItem/LanguageListItem';

interface LanguagesListProps {
    oldLanguages: string[];
}

  export default function LanguageList({ oldLanguages }: LanguagesListProps) {
    const [openModal, toggleOpenModal] = useState<boolean>(false);
    const [dialogValue, setDialogValue] = useState<string>('');
    const [languages, setLanguages] = useState<string[]>(oldLanguages);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(dialogValue.trim() !== ''){
        if(!languages.some((language) => language.toLowerCase() === (dialogValue.toLowerCase())))
            setLanguages([...languages, dialogValue]);
        else{
            setIsSnackbarOpen(true);
        }
        //addLanguage(dialogValue); api
        handleClose();
      }
      else{
        alert('Please write something inside the input box')
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
        {languages.map((language) => (
          <Grid item xs={12} key={language}>
            <LanguageListItem language={language} handleDelete={(lang : string)=>handleDelete(lang)}/>
          </Grid>
        ))}
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
              <Button type="submit">Add</Button>
              </DialogActions>
          </form>
        </Dialog>
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={()=>setIsSnackbarOpen(false)}
            message={`The selected language already exists inside the tenant`}
        />
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={()=>setIsSnackbarOpen(false)}
        />
      <Button variant="contained" color="success" onClick={() => toggleOpenModal(true)} fullWidth sx={{marginTop:grid.rowSpacing}}>
        Add new language
      </Button>
      </>

      
    );
  }
  
