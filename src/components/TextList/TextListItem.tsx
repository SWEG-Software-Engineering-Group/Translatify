import React from 'react';
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
import Text from '../../types/Text';
import { Link } from 'react-router-dom';
import replaceSpacesWithUnderscore from '../../types/replaceSpacesWithUnderscore';
//import User from '../../types/User';

interface TextListItemProps{
    textData : Text,
    category : string,
    // user : User,
}

const language = 'italian'

export default function TextListItem({textData, category} : TextListItemProps) {
    const [open, setOpen] = React.useState(false);
    const buttons = useMemo(()=>{
        let content = [];
        if(textData.state === TextState.toBeTranslated)
            content.push(<Link key='translate' to={`/editTranslation/${replaceSpacesWithUnderscore(category)}/${replaceSpacesWithUnderscore(textData.id)}/${language}`}><Button variant='contained'>Translate</Button></Link>);
        else if(textData.state === TextState.verified)
            content.push(<Button key='redo' color='error' variant='contained' onClick={handleRedo}>Redo</Button>); //&& user='admin'
        else if(textData.state === TextState.toBeVerified){ //&& user='admin'
            content.push(<Button key='accept' variant='contained' onClick={handleAccept}>Accept</Button>);
            content.push(<Button key='reject' onClick={handleReject} color='error' variant='contained'>Reject</Button>);
            content.push(<Link key='edit' to={`/editTranslation/${replaceSpacesWithUnderscore(category)}/${replaceSpacesWithUnderscore(textData.id)}/${language}`}><Button color='secondary' variant='contained'>Edit</Button></Link>);
        }
        return <TableCell sx={{display:'flex', gap:'1rem'}} align="right">{content}</TableCell>;
    }, [category, textData.id, textData.state]);

    function handleRedo(){

    }
    function handleAccept(){
      
    }
    function handleReject(){
      
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
          { buttons     
        }
          {/* <TableCell align="right">{textData.creator}</TableCell> */}
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Text
                  {/* if language === originalLanguage show Text else Translation*/}
                </Typography> {textData.text} <Typography/>
                {/* if user===admin show edit button */}
                <Link to={`/edit/${replaceSpacesWithUnderscore(category)}/${replaceSpacesWithUnderscore(textData.id)}`}><Button variant="contained">Edit</Button></Link>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }