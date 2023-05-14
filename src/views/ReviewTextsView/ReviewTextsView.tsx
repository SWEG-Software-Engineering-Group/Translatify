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

  const { tenant } = useAuth() || {}; // Use empty object if useAuth() returns null or undefined
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    // Add a null check for tenant before calling getData()
    if (tenant?.id) {
      getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/secondaryLanguages`)
        .then((res) => {
          if (Array.isArray(res.data.languages)) {
            setLanguages(res.data.languages);
            setPickedLanguage(res.data.languages[0]);
          } else {
            setError('No languages found.');
          }
        })
        .catch((err) => {
          setError('No languages found.');
          throw(err);
        });
    }
  }, [tenant?.id]);

  useEffect(() => {
    setError('');
    // Add a null check for tenant before calling getData()
    if (tenant?.id) {
      getData(`${process.env.REACT_APP_API_KEY}/text/${tenant.id}/${pickedLanguage}/state/toBeVerified`)
        .then((res) => {
          setTexts(res.data.texts);
        })
        .catch((error) => {
          setError('No reviews found.');
          throw(error);
        });
    }
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
          <PageTitle title='Your Tenant Review Texts'/>
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
