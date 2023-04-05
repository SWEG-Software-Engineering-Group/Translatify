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

interface TextListProps {
    categoryFilter : string,
    languageFilter : string,
    stateFilter : string,
    searchFilter : string,
    // user : User,
}
  
export default function TextList({categoryFilter, languageFilter, stateFilter, searchFilter} : TextListProps) {

  const filteredTexts = filterTexts();

  function filterTexts(){
    return texts.filter(text => {
      // let categoryMatch : boolean;
      // if(categoryFilter === '') categoryMatch = true;
      // else categoryMatch = text.category === categoryFilter;
      // let languageMatch : boolean;
      // if(languageFilter === '') languageMatch = true;
      // else languageMatch = text.language === categoryFilter;
      let stateMatch : boolean;
      if(stateFilter === 'ALL') stateMatch = true;
      else stateMatch = convertTextState(TextState[text.state]) === stateFilter;
      // return categoryMatch && languageMatch && stateMatch;
      let searchMatch : boolean;
      if(!searchFilter) searchMatch = true;
      else searchMatch = text.id.toLowerCase().includes(searchFilter.toLowerCase().trim());
      // return categoryMatch && languageMatch && stateMatch && searchFilter;
      return stateMatch && searchMatch;
    });
    
  }

  return (
    <TableContainer component={Paper} sx={{maxHeight:'90%'}}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell>Text id</TableCell>
            {/* <TableCell align="right">Category</TableCell>
            <TableCell align="right">Language</TableCell> */}
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Actions</TableCell>
            {/* <TableCell align="right">Creator</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTexts.length !== 0 ?
            filteredTexts.map((text : Text) => 
              <TextListItem textData={text} key={text.id} category={'category'}/>
            )
            :
            <TableRow><TableCell align='center'>There is no text that matches these filters</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );  
}