import React, {useState} from 'react';
import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextState from '../../types/TextState';
import convertTextState from '../../utils/Text/convertTextState';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Text from '../../types/Text';
import { Link } from 'react-router-dom';
import replaceSpacesWithUnderscore from '../../utils/replaceSpacesWithUnderscore';

import { deleteData } from '../../services/axios/axiosFunctions';
import { useAuth } from '../../hooks/useAuth';

interface TextListItemProps{
    textData : Text,
    category : string,
    userType : string,
}

const language = 'italian' //remember to change it when using API calls

export default function TextListItem({textData, category, userType} : TextListItemProps) {
    const [open, setOpen] = React.useState(false);
    const buttons = useMemo(()=>{
        let content = [];
        if(textData.state === TextState.toBeTranslated)
            content.push(<Link key='translate' to={`/editTranslation/${replaceSpacesWithUnderscore(category)}/${replaceSpacesWithUnderscore(textData.id)}/${language}`}><Button variant='contained'>Translate</Button></Link>);
        else if(textData.state === TextState.verified && userType ==='admin')
            content.push(<Button key='redo' color='error' variant='contained' onClick={handleRedo}>Redo</Button>);
        else if(textData.state === TextState.toBeVerified){
            content.push(<Link key='edit' to={`/editTranslation/${replaceSpacesWithUnderscore(category)}/${replaceSpacesWithUnderscore(textData.id)}/${language}`}><Button color='secondary' variant='contained'>Edit translation</Button></Link>);
        }
        return content.length !== 0 ? <TableCell sx={{display:'flex', gap:'1rem'}} align="right">{content}</TableCell> : <TableCell></TableCell> ;
    }, [category, textData.id, textData.state, userType]);

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        //api that handles text delete
        setSnackbarOpen(true);
        handleCloseDialog();
    };
  
    const handleOpenDialog = () => {
      setConfirmDelete(true);
    };
    const handleCloseDialog = () => {
      setConfirmDelete(false);
    };

    function handleRedo(){
        //api that handles redo
    }

    return (
      <React.Fragment key={textData.id}>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {textData.id}
          </TableCell>
          <TableCell align="right">{convertTextState(TextState[textData.state])}</TableCell>
          { buttons }
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Text
                </Typography> {textData.text} <Typography/>
                <Box sx={{marginBlock:'1rem', display:'flex', alignItems:'space-between'}}>
                  {userType === 'admin' && <Button onClick={handleOpenDialog} sx={{marginLeft:'auto'}} variant="outlined" color='error' fullWidth> Delete text</Button>}
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        {confirmDelete && (
        <Dialog open onClose={handleCloseDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this text:{textData.id}? All translations will be deleted as well permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
        )}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
            Text and translations have been deleted
          </MuiAlert>
        </Snackbar>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      </React.Fragment>
    );
  }