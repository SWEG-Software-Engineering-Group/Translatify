import { Button, Card, CardContent, CardHeader, Collapse, IconButton, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField, Snackbar } from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguagesItem from "./LanguageList/LanguageList";
import { grid } from '../../../utils/MUI/gridValues';
import Picker from '../../Picker/Picker';


interface ListProps{
    languages : string[];
    onChange : (newLang : string) => void;
}


export default function LanguageList({languages, onChange} : ListProps){
const [open, setOpen] = useState<boolean>(false);
const [openModal, toggleOpenModal] = useState<boolean>(false);
const [dialogValue, setDialogValue] = useState<string>('');
const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

function addLanguage(){
      
}

const handleClose = () => {
    setDialogValue('');
    toggleOpenModal(false);
  };

  const handleCancel = () => {
    handleClose();
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!languages.some((language) => language.toLowerCase() === (dialogValue.toLowerCase())))
        onChange(dialogValue);
    else{
        setIsSnackbarOpen(true);
    }
    //addLanguage(dialogValue);
    handleClose();
  };


return(
    <Card>
    <CardHeader
        title="Languages"
        action={
            <IconButton
                onClick={() => setOpen(!open)}
                aria-label="expand"
                size="small"
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        }
    >
    </CardHeader>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
            <LanguagesItem languages={languages ?? []} />
                <Button variant="contained" color="success" onClick={() => toggleOpenModal(true)} fullWidth sx={{marginTop:grid.rowSpacing}}>
                    Add new language
                </Button>
        </CardContent>
    </Collapse>
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
    </Card>
    )
};