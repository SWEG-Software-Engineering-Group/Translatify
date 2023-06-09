import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Text from '../../types/Text';
import TextListItem from './TextListItem';
import convertTextState from '../../utils/Text/convertTextState';
import TextState from '../../types/TextState';
import { useAuth } from '../../hooks/useAuth';
import { getData } from '../../services/axios/axiosFunctions';
import { useEffect, useState } from 'react';

interface TextListProps {
  categoryFilter: string;
  languageFilter: string;
  stateFilter: string;
  searchFilter: string;
  userType: string;
}

export default function TextList({ categoryFilter, languageFilter, stateFilter, searchFilter, userType}: TextListProps) {
  const { tenant } = useAuth() || {};
  const [texts, setTexts] = useState<Text[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Add a null check for tenant before calling getData()
    if (tenant?.id) {
      getData(`${process.env.REACT_APP_API_KEY}/text/${tenant.id}/allTexts`)
        .then((res) => {
          setTexts(res?.data?.response);
        })
        .catch((err) => { 
          setError('Error fetching reviews.');
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant?.id]);

  const handleDelete = (title : string) => {
    setTexts(texts.filter((text) => text.title !== title));
  };

  const handleRedo = (title : string) => {
    setTexts(texts.map((text) => {
      if(text.title !== title)
        return text;
      else
        return {...text, state: 4, feedback: 'Do again'};      
    }));
  };

  function filterTexts() {
    if (!texts) return [];
    return texts.filter((text) => {
      let stateMatch: boolean;
      if (stateFilter === '-') stateMatch = true;
      else stateMatch = convertTextState(TextState[text.state]) === stateFilter;

      let searchMatch: boolean;
      if (!searchFilter) searchMatch = true;
      else searchMatch = text.title.toLowerCase().includes(searchFilter.toLowerCase().trim());

      let languageMatch: boolean;
      if (languageFilter === '-') languageMatch = true;
      else languageMatch = text.language.toLowerCase().includes(languageFilter.toLowerCase().trim());      

      let categoryMatch: boolean;
      if (categoryFilter === '-') categoryMatch = true;
      else categoryMatch = text.category.name.toLowerCase().includes(categoryFilter.toLowerCase().trim());

      return stateMatch && searchMatch && languageMatch && categoryMatch;
    });
  }

  const filteredTexts = filterTexts();

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '90%', alignContent: 'center', alignItems: 'center' }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Text title</TableCell>
            <TableCell align="right">Language</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTexts.length !== 0 ? (
            filteredTexts.map((text: Text) => (
              <TextListItem
                textData={text}
                handleDelete={handleDelete}
                handleRedo={handleRedo}
                userType={userType}
                key={text.title+'-'+text.language}
                defaultLanguage={tenant.defaultLanguage}
              />
            ))
          ) : (
            <TableRow>
              <TableCell align="center">There is no text that matches these filters</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
