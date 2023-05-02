import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Text from '../../types/Text';
import texts from './testData';
import TextListItem from './TextListItem'
import convertTextState from '../../utils/Text/convertTextState';
import TextState from '../../types/TextState';
import { useAuth } from '../../hooks/useAuth';

interface TextListProps {
    categoryFilter : string,
    languageFilter : string,
    stateFilter : string,
    searchFilter : string,
    userType : string,
}
  
export default function TextList({categoryFilter, languageFilter, stateFilter, searchFilter, userType} : TextListProps) {

  const {tenant} = useAuth();
  const filteredTexts = filterTexts();

  function filterTexts(){
    return texts.filter(text => {
      let stateMatch : boolean;
      if(stateFilter === '-') stateMatch = true;
      else stateMatch = convertTextState(TextState[text.state]) === stateFilter;
      
      let searchMatch : boolean;
      if(!searchFilter) searchMatch = true;
      else searchMatch = text.id.toLowerCase().includes(searchFilter.toLowerCase().trim());
      return stateMatch && searchMatch;
    });
    
  }

  return (
    <TableContainer component={Paper} sx={{maxHeight:'90%', alignContent: 'center', alignItems: 'center'}}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell>Text ID</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTexts.length !== 0 ?
            filteredTexts.map((text : Text) => 
              <TextListItem userType={userType} textData={text} key={text.id} defaultLanguage={tenant.defaultLanguage} category={'category'}/>
            )
            :
            <TableRow><TableCell align='center'>There is no text that matches these filters</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );  
}