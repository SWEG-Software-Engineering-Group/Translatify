import { useState, useEffect } from "react";
import TranslationList from "../../components/TranslationList/TranslationList";
import testData from "./testData";
import Picker from "../../components/Picker/Picker";
import TextCategory from "../../types/TextCategory";
import { Container } from "@mui/system";
import allLanguages from "../../utils/Languages/allLanguages";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Box from "@mui/material/Box";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { getData } from "../../services/axios/axiosFunctions";
import { useAuth } from "../../hooks/useAuth";

export default function ReviewTextsView() {
 
  const [translationList, setTranslationList] = useState<TextCategory[] | null>(null);
  const [pickedLanguage, setPickedLanguage] = useState<string>();

  const { tenant } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    getData(`${process.env.REACT_APP_API_KEY}/text/${tenant.id}/allTexts`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTranslationList(res.data);
        } else {
          setError('Error fetching reviews.');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching reviews.');
      });
  }, [tenant.id]);
  

  const handleLanguageChange = (newValue: string) => {
    setPickedLanguage(newValue);
  };

  const filteredList =
  pickedLanguage === undefined || translationList === null
    ? []
    : translationList
        .map((category) => ({
          ...category,
          List: category.List.filter((text) => category.language === pickedLanguage),
        }))
        .filter((category) => category.List.length > 0);

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
                    choices={allLanguages}
                    onClear={() => setPickedLanguage(undefined)}
                  />
                </Box>
                {error ? (
                  <div>{error}</div>
                ) : (
                  <TranslationList translationList={filteredList} />
                )}
              </Container>
            </LayoutWrapper>
          </PrivateRoute>
        );
}
