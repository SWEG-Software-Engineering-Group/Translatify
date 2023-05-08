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
import replaceSpacesWithComboSymbol from '../../utils/replaceSpacesWithComboSymbol';
import { deleteData, putData } from '../../services/axios/axiosFunctions';

interface TextListItemProps{
    textData : Text,
    handleDelete: (title : string) => void;
    handleRedo: (title : string) => void;
    userType : string,
    defaultLanguage : string,
}


export default function TextListItem({textData, userType, defaultLanguage, handleDelete, handleRedo} : TextListItemProps) {
    const [open, setOpen] = React.useState(false);
    const buttons = useMemo(()=>{
        let content = [];
        if(textData.state === TextState.toBeTranslated || textData.state === TextState.rejected )
            content.push(<Link key='translate' to={`/editTranslation/${textData.category.id}/${replaceSpacesWithComboSymbol(textData.title)}/${textData.language}`}><Button variant='contained'>Translate</Button></Link>);
        else if(textData.state === TextState.verified && userType ==='admin')
            content.push(<Button key='redo' color='error' variant='contained' onClick={handleRedoText}>Redo</Button>);
        else if(textData.state === TextState.toBeVerified){
            content.push(<Link key='edit' to={`/editTranslation/${textData.category.id}/${replaceSpacesWithComboSymbol(textData.title)}/${textData.language}`}><Button color='secondary' variant='contained'>Edit translation</Button></Link>);
        }
        if(textData.language === defaultLanguage && userType === 'admin' ){
          content.push(<Link key='edit original' to={`/edit/${textData.category.id}/${replaceSpacesWithComboSymbol(textData.title)}`}><Button variant="contained">Edit original</Button></Link>);
        }
        return content.length !== 0 ? <TableCell sx={{display:'flex', gap:'1rem'}} align="right">{content}</TableCell> : <TableCell></TableCell> ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textData.state, textData.title, textData.language, textData.category.id, userType, defaultLanguage]);

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteText = () => {
        //api that handles text delete
        deleteData(`${process.env.REACT_APP_API_KEY}/text/${textData.idTenant}/category/${textData.category.id}/${textData.title}/originalText`)
        .then(res=>{
          setSnackbarMessage('Text and translations have been deleted');
          setSnackbarOpen(true);
          handleDelete(textData.title);
        })
        .catch(err=>{
          setSnackbarErrorOpen(true);
        })
        handleCloseDialog();
    };
  
    const handleOpenDialog = () => {
      setConfirmDelete(true);
    };
    const handleCloseDialog = () => {
      setConfirmDelete(false);
    };

    function handleRedoText(){
        //api that handles redo
        putData(`${process.env.REACT_APP_API_KEY}/text/${textData.idTenant}/${textData.language}/${textData.category.id}/${textData.title}/rejectTranslation`, 'Do again')
        .then(res=>{
          setSnackbarMessage('Translation set to be re-done');
          setSnackbarOpen(true);
          handleRedo(textData.title);
        })
        .catch(err=>{
          setSnackbarErrorOpen(true);
        })
    }

    return (
      <React.Fragment key={textData.title}>
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
            {textData.title}
          </TableCell>
          <TableCell align="right">
            {textData.language}
          </TableCell>
          <TableCell align="right">
            {textData.category.name}
          </TableCell>
          <TableCell align="right">{convertTextState(TextState[textData.state])}</TableCell>
          { buttons }
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgba(214, 201, 54, 0.4)' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Text
                </Typography>
                  {textData.text !== null 
                  ?
                    <Typography>{textData.text}</Typography>
                  :
                  <i>There is no text yet</i>
                  }
                <Box sx={{marginBlock:'1rem', display:'flex', alignItems:'space-between'}}>
                  {userType === 'admin' && textData.language === defaultLanguage && <Button onClick={handleOpenDialog} sx={{marginLeft:'auto'}} variant="outlined" color='error' fullWidth> Delete text</Button>}
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
              Are you sure you want to delete this text:{textData.title}? All translations will be deleted as well permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button onClick={handleDeleteText}>Yes</Button>
          </DialogActions>
        </Dialog>
        )}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
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