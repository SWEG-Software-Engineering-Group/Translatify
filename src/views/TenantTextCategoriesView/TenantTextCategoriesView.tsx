import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { grid } from "../../utils/MUI/gridValues";
import SearchBox from "../../components/SearchBox/SearchBox";
import TextCategory from "../../types/TextCategory";
import TextCategoriesListItem from "../../components/TextCategoriesList/TextCategoriesListItem/TextCategoriesListItem";
import testData from "./testData";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";
import { getData } from "../../services/axios/axiosFunctions";

export default function TenantTextCategoriesView() {    
    // HOOKS
    const [categories, setCategories] =  useState<TextCategory[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<TextCategory[]>([]);
    const {tenant} = useAuth();

    useEffect(() => {
        setCategories(testData);
        setFilteredCategories(testData);
    }, []);

    // useEffect(()=>{
    //   getData(`${process.env.REACT_APP_API_KEY}/text/${tenant.id}/allCategories`) //da cambiare
    //   .then(res=>{
    //     setCategories(res.data.categories);
    //     setFilteredCategories(res.data.categories);
    //   })
    //   .catch(err=>{
    //     console.log(err); 
    //   })
    // }, []);

    const handleSearch = (query: string) => {
        const filtered = categories.filter((category) => {
          if (category.idCategory.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
          return false;
        });
        setFilteredCategories(filtered);
      };

  return (
     <PrivateRoute allowedUsers={['admin']}>
       <LayoutWrapper userType="admin">
          <Grid
              container
              spacing={1}
              direction="column"
          >
          <Grid item xs={grid.fullWidth} textAlign={"center"}>
            <PageTitle title='Tenant Text Categories Page'/>
          </Grid>
          <Box sx={{ p: 3 }}>
              <SearchBox handleParentSearch={handleSearch} />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredCategories.length ? (
                  filteredCategories.map((category) => (
                  <Grid item xs={12} key={category.idCategory}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12}>
                        <TextCategoriesListItem category={category} />
                      </Grid>
                  </Grid>
              </Grid>
          ))
            ) : (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                <p>No categories found</p>
              </Grid>
            )}
            </Grid>
          </Box>
          </Grid>
           </LayoutWrapper>
     </PrivateRoute>
    );
}
