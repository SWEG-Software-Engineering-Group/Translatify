import { useState, useEffect } from "react";
import Picker from "../../components/Picker/Picker";
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";
import TextState from "../../types/TextState";
import convertTextState from "../../utils/Text/convertTextState";
import { Grid } from "@mui/material";
import { grid } from "../../utils/MUI/gridValues";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import SearchBox from "../../components/SearchBox/SearchBox";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";
import { getData } from "../../services/axios/axiosFunctions";

export default function TenantTextsView() {
  const textStates: string[] = ["-"].concat(
    Object.keys(TextState)
      .filter((state) => isNaN(Number(state)))
      .map((state) => convertTextState(state))
  );
  const [pickedCategory, setPickedCategory] = useState<string>("-");
  const [pickedLanguage, setPickedLanguage] = useState<string>("-");
  const [pickedTextState, setPickedTextState] = useState<string>("-");
  const [pickedSearch, setPickedSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/secondaryLanguages`)    
    .then(res =>{
      setLanguages(['-', ...(res.data.languages ?? [])]);      
      getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/allCategories`)    
      .then(res =>{
        setCategories(['-', ...(res.data.categories ?? [])]);      
      })
      .catch(err=> {throw err;})
    })
    .catch(err=>{
      console.log(err);
    })    
    // setCategories(['-', ...(res.data.tenant?.categories ?? [])]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClearCategory = () => {
    setPickedCategory("-");
  }

  const handleClearTextState = () => {
    setPickedTextState("-");
  }

  const handleClearLanguage = () => {
    setPickedLanguage("-");
  } 

  return (
    <PrivateRoute allowedUsers={['admin', 'user']}>
      <LayoutWrapper userType={auth.user.group}>
      <PageTitle title='Your Tenant Texts'/>
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
                  id={"Choose category to filter"}
                  value={pickedCategory}
                  onChange={handleCategoryChange}
                  choices={categories}
                  onClear = {handleClearCategory}
                />
              </Grid>
              <Grid
                item
                xs={grid.fullWidth}
                sm={grid.responsiveThreeInLine}
              >
                <Picker
                  id={"Choose language to filter"}
                  value={pickedLanguage}
                  onChange={handleLanguageChange}
                  choices={languages}
                  onClear = {handleClearLanguage}
                />
              </Grid>
              <Grid
                item
                xs={grid.fullWidth}
                sm={grid.responsiveThreeInLine}
              >
                <Picker
                  id={"Choose state to filter"}
                  value={pickedTextState}
                  onChange={handleTextStateChange}
                  choices={textStates}
                  onClear = {handleClearTextState}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <SearchBox handleParentSearch={handleSearchChange} />
          </Grid>
          <Grid item xs={grid.fullWidth} height="calc(80% - 4rem)">
              <TextList userType={auth.user.group} categoryFilter={pickedCategory} languageFilter={pickedLanguage} stateFilter={pickedTextState} searchFilter={pickedSearch}/>
          </Grid>
      </Grid>
        {auth.user.group === 'admin' ? <CreateTextButton /> : <></>}
      </LayoutWrapper>
    </PrivateRoute>
    )
}
