import { useState, useEffect } from 'react';
import testData from './testData';
import Picker from '../../components/Picker/Picker';
import allLanguages from '../../utils/Languages/allLanguages';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import TextCategory from '../../types/TextCategory';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useAuth } from '../../hooks/useAuth';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import TextSearch from "../../components/TextSearch/TextSearch";
import TextState from '../../types/TextState';

export default function UserView() {
  const [language, setLanguage] = useState<string>('');
  const [texts, setTexts] = useState<TextCategory[]>([]);
  const auth = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [progress, setProgress] = useState<'Done' | 'Not Done' | ''>('');

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

    // Filter the texts based on the progress
    if (progress === 'Done') {
      filteredTexts = filteredTexts
        .map((category) => ({
          ...category,
          List: category.List.filter(
            (text) =>
              text.state === TextState.rejected ||
              text.state === TextState.verified ||
              text.state === TextState.toBeVerified
          ),
        }))
        .filter((category) => category.List.length > 0);
    } else if (progress === 'Not Done') {
      filteredTexts = filteredTexts
        .map((category) => ({
          ...category,
          List: category.List.filter(
            (text) => text.state === TextState.toBeTranslated
          ),
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
  }, [language, searchTerm, progress]);


return (
  <PrivateRoute allowedUsers={['admin', 'user']} >
    <LayoutWrapper userType={auth.user.role}>
      <PageTitle title='User Page'/>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
            <TextSearch handleParentSearch={handleSearchChange} />
          </Grid>
        <Grid item xs={12}>
          <Picker
            id='Select language'
            value={language}
            onChange={(value: string) => setLanguage(value)}
            choices={allLanguages}
          />
          <Picker
            id='Select progress'
            value={progress}
            onChange={(value: string) => setProgress(value as 'Done' | 'Not Done' | '')}
            choices={['', 'Done', 'Not Done']}
          />
            <Grid container spacing={2}>
              {texts.map((textCategory) =>
                textCategory.List.map((text) => (
                  <Grid key={text.id} item xs={12} sm={6} md={4}>
                  <Link
                      to={`/editTranslation/${textCategory.idCategory}/${text.id}/${testData[0].language}`}
                      style={{ textDecoration: 'none' }}
                  >
                      <Card>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          <Typography variant="h4" gutterBottom>
                            {text.text}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Feedback: {text.feedback}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Comment: {text.comment}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
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

