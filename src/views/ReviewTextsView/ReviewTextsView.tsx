import { useState } from "react";
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

export default function ReviewTextsView() {
  const [translationList] = useState<TextCategory[]>(testData);
  const [pickedLanguage, setPickedLanguage] = useState<string>();

  const handleLanguageChange = (newValue: string) => {
    setPickedLanguage(newValue);
  };

  const filteredList =
    pickedLanguage === undefined
      ? translationList
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
      
          <TranslationList translationList={filteredList} />
        </Container>
      </LayoutWrapper>
    </PrivateRoute>
  );
}