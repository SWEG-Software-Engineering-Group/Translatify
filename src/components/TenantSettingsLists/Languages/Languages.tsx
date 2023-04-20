import { Button, Card, CardContent, CardHeader, Collapse, IconButton} from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageList from "./LanguageList/LanguageList";



interface ListProps{
    oldLanguages : string[];    
}


export default function Languages({oldLanguages} : ListProps){
    const [open, setOpen] = useState<boolean>(false);

    function addLanguage(){
        
    }


<<<<<<< HEAD


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
                <LanguageList oldLanguages={oldLanguages ?? []} />
            </CardContent>
        </Collapse>
        </Card>
=======
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
                Here you can insert a new language to your Tenant.
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
>>>>>>> 198aac2224a592c9e625df5574275ee94ba9cd4f
    )
};