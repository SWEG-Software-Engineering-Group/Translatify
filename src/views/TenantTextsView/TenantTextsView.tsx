import { useState, useEffect } from "react";
import Picker from "../../components/Picker/Picker";
import { categories, languages } from "./testData";
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";
import TextState from "../../types/TextState";
import convertTextState from "../../utils/Text/convertTextState";
import { Grid } from "@mui/material";
import { grid } from "../../utils/MUI/gridValues";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import TextSearch from "../../components/TextSearch/TextSearch";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";

export default function TenantTextsView() {
  //HOOKS
  const textStates: string[] = ["ALL"].concat(
    Object.keys(TextState)
      .filter((state) => isNaN(Number(state)))
      .map((state) => convertTextState(state))
  );
  const [pickedCategory, setPickedCategory] = useState<string>("ALL");
  const [pickedLanguage, setPickedLanguage] = useState<string>("ALL");
  const [pickedTextState, setPickedTextState] = useState<string>("ALL");
  const [pickedSearch, setPickedSearch] = useState<string>("");
  const auth = useAuth();

  useEffect(() => {
    //call api to get data and sets them
  }, []);

  const handleCategoryChange = (newValue: string) => {
    setPickedCategory(newValue);
  };

  const handleLanguageChange = (newValue: string) => {
    setPickedLanguage(newValue);
  };

  const handleTextStateChange = (newValue: string) => {
    setPickedTextState(newValue);
  };

  const handleSearchChange = (newValue: string) => {
    setPickedSearch(newValue);
  };

  return (
    <PrivateRoute allowedUsers={['admin', 'user']}>
      <LayoutWrapper userType={auth.user.role}>
      <PageTitle title='Tenant Texts'/>
        <Grid
          container
          direction="column"
          rowSpacing={grid.rowSpacing}
          wrap="nowrap"
          height="80vh"
          zIndex={1}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              columnSpacing={grid.columnSpacing}
              rowSpacing={grid.rowSpacing}
              alignItems="center"
              zIndex={1}
            >
              <Grid
                item
                xs={grid.fullWidth}
                sm={grid.responsiveThreeInLine}
              >
                <Picker
                  id={"category"}
                  value={pickedCategory}
                  onChange={handleCategoryChange}
                  choices={categories}
                />
              </Grid>
              <Grid
                item
                xs={grid.fullWidth}
                sm={grid.responsiveThreeInLine}
              >
                <Picker
                  id={"language"}
                  value={pickedLanguage}
                  onChange={handleLanguageChange}
                  choices={languages}
                />
              </Grid>
              <Grid
                item
                xs={grid.fullWidth}
                sm={grid.responsiveThreeInLine}
              >
                <Picker
                  id={"state"}
                  value={pickedTextState}
                  onChange={handleTextStateChange}
                  choices={textStates}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextSearch handleParentSearch={handleSearchChange} />
          </Grid>
          <Grid item xs={grid.fullWidth} height="calc(80% - 4rem)">
              <TextList userType={auth.user.role} categoryFilter={pickedCategory} languageFilter={pickedLanguage} stateFilter={pickedTextState} searchFilter={pickedSearch}/>
          </Grid>
      </Grid>
      <CreateTextButton />
      </LayoutWrapper>
    </PrivateRoute>
    )
}
