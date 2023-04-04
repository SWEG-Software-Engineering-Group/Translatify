import { useState, useEffect } from 'react';
import testData from './testData';
import Picker from '../../components/Picker/Picker';
import allLanguages from '../../utils/Languages/allLanguages';
import Button from '@mui/material/Button';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import TextCategory from '../../types/TextCategory';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function UserView() {
  const [language, setLanguage] = useState<string>('');
  const [texts, setTexts] = useState<TextCategory[]>([]);

  useEffect(() => {
    // Load all texts when component mounts
    setTexts(testData);
  }, []);

  const handleGetTextToTranslate = () => {
    // Filter the texts based on the selected language
    const filteredTexts = testData
      .map((category) => ({
        ...category,
        List: category.List.filter((text) => category.language === language),
      }))
      .filter((category) => category.List.length > 0);
  
    // Update the state with the filtered texts
    setTexts(filteredTexts);
    // API call to get text to translate for the selected language
    // Navigate to CreateEditTextView with the retrieved text data
  };
  
  return (
    <LayoutWrapper userType='content'>
      <Picker
        id='Select language'
        value={language}
        onChange={(value: string) => setLanguage(value)}
        choices={allLanguages}
      />
      <Button onClick={handleGetTextToTranslate} disabled={!language} fullWidth>
        Get text to translate
      </Button>

      <Grid container spacing={2}>
        {texts.map((textCategory) =>
          textCategory.List.map((text) => (
            <Grid key={text.id} item xs={12} sm={6} md={4}>
            <Link
                to={`/editTranslation/${textCategory.idCategory}/${text.id}`}
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
    </LayoutWrapper>
  );
}
