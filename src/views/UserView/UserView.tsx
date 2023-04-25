import { useState, useEffect } from 'react';
import testData from './testData';
import Picker from '../../components/Picker/Picker';
import allLanguages from '../../utils/Languages/allLanguages';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Grid from '@mui/material/Grid';
import TextCategory from '../../types/TextCategory';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useAuth } from '../../hooks/useAuth';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import SearchBox from "../../components/SearchBox/SearchBox";
import UserTranslationItem from '../../components/UserTranslationItem/UserTranslationItem';

export default function UserView() {
  const [language, setLanguage] = useState<string>('');
  const [texts, setTexts] = useState<TextCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const auth = useAuth();
  
  const handleSearchChange = (newValue: string) => {
    setSearchTerm(newValue);
  };

  useEffect(() => {
    // Load all texts when component mounts
    setTexts(testData);
  }, []);

  useEffect(() => {
    let filteredTexts = testData;

    if (language) {
      // Filter the texts based on the selected language
      filteredTexts = filteredTexts
        .map((category) => ({
          ...category,
          List: category.List.filter((text) => category.language === language),
        }))
        .filter((category) => category.List.length > 0);
    }

    // Filter the texts based on the search term
    if (searchTerm) {
      filteredTexts = filteredTexts
        .map((category) => ({
          ...category,
          List: category.List.filter((text) =>
            text.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            text.id.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.List.length > 0);
    }

    // Update the state with the filtered texts
    setTexts(filteredTexts);
  }, [language, searchTerm]);


return (
  <PrivateRoute allowedUsers={['admin', 'user']} >
    <LayoutWrapper userType={auth.user.group}>
      <PageTitle title='User Dashboard'/>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
            <SearchBox handleParentSearch={handleSearchChange} />
          </Grid>
        <Grid item xs={12}>
          <Picker
            id='Select language'
            value={language}
            onChange={(value: string) => setLanguage(value)}
            choices={allLanguages}
            onClear={() =>{
              setLanguage('');
              setTexts(testData);
            }}
          />          
            <Grid container spacing={2}>
              {texts.map((textCategory) =>
                textCategory.List.map((text) => (
                  <Grid key={text.id} item xs={12} sm={6} md={4}>
                    <UserTranslationItem language={testData[0].language} idCategory={textCategory.idCategory} text={text}/>
                  </Grid>
                ))
              )}
            </Grid>
        </Grid>
      </Grid>
    </LayoutWrapper>
  </PrivateRoute>
);
}

