import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grid } from "../../utils/MUI/gridValues";
import TextSearch from "../../components/TextSearch/TextSearch";
import TextCategory from "../../types/TextCategory";
import TextCategoriesListItem from "../../components/TextCategoriesList/TextCategoriesListItem/TextCategoriesListItem";
import testData from "./testData";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

export default function TenantCategoriesView() {    
    // HOOKS
    const [categories, setCategories] =  useState<TextCategory[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<TextCategory[]>([]);

    useEffect(() => {
        setCategories(testData);
        setFilteredCategories(testData);
    }, []);

    const handleSearch = (query: string) => {
        const filtered = categories.filter((category) => {
          // cerca il tenant in base al nome
          if (category.idCategory.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
    
          return false;
        });
        setFilteredCategories(filtered);
      };

    // UI
  return (
     <PrivateRoute allowedUsers={['admin']}>
       <LayoutWrapper userType="admin">
          <Grid
              container
              spacing={1}
              direction="column"
          >
          <Grid item xs={grid.fullWidth} textAlign={"center"}>
            <PageTitle title='Tenant Text-Categories Page'/>
          </Grid>
          <Box sx={{ p: 3 }}>
              <TextSearch handleParentSearch={handleSearch} />
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
