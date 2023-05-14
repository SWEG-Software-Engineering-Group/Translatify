import { useState, useEffect } from "react";
import TranslationList from "../../components/TranslationList/TranslationList";
import Picker from "../../components/Picker/Picker";
import { Container } from "@mui/system";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Box from "@mui/material/Box";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { getData } from "../../services/axios/axiosFunctions";
import { useAuth } from "../../hooks/useAuth";
import Text from "../../types/Text";

export default function ReviewTextsView() {
 
  const [texts, setTexts] = useState<Text[]>([]);
  const [pickedLanguage, setPickedLanguage] = useState<string>();
  const [languages, setLanguages] = useState<string[]>([]);

  const { tenant } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant?.id}/secondaryLanguages`)
      .then((res) => {
        if (Array.isArray(res.data.languages)) {
          setLanguages(res.data.languages);
          setPickedLanguage(res.data.languages[0]);
        } else {
          setError('Error fetching languages.');
        }
      })
      .catch((err) => {
        setError('Error fetching languages.');
      });
  }, [tenant?.id]);

  useEffect(() => {
    setError('');
    getData(`${process.env.REACT_APP_API_KEY}/text/${tenant?.id}/${pickedLanguage}/state/toBeVerified`)
      .then((res) => {
          setTexts(res.data.texts);
      })
      .catch((error) => {
        setError('Error fetching reviews.');
      });
  }, [pickedLanguage, tenant?.id]);

  const handleRemove = (title : string)=>{
    setTexts(texts.filter(text=> text.title !== title));
  }

  const handleLanguageChange = (newValue: string) => {
    setPickedLanguage(newValue);
  };

  return (
    <PrivateRoute allowedUsers={['admin']}>
      <LayoutWrapper userType="admin">
        <Container>
          <PageTitle title='Review Texts Page'/>
          <Box sx={{marginBottom: 5}}>
            <Picker
              id={"Choose language to filter"}
              value={pickedLanguage || null}
              onChange={handleLanguageChange}
              choices={languages}
              onClear={() => setPickedLanguage(languages[0])}
            />
          </Box>
          {error ? (
            <Box sx={{alignItems: "center", alignContent:"center"}}><div>{error}</div></Box>
          ) : (
            <TranslationList removeFromList={handleRemove} translationList={texts} />
          )}
        </Container>
      </LayoutWrapper>
    </PrivateRoute>
  );
}
