import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { grid } from "../../utils/MUI/gridValues";
import SearchBox from "../../components/SearchBox/SearchBox";
import TextCategory from "../../types/TextCategory";
import TextCategoriesListItem from "../../components/TextCategoriesList/TextCategoriesListItem/TextCategoriesListItem";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";
import { getData } from "../../services/axios/axiosFunctions";
import TextCategoriesList from "../../components/TextCategoriesList/TextCategoriesList";

export default function TenantTextCategoriesView() {    
    // HOOKS
    const [categories, setCategories] =  useState<TextCategory[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<TextCategory[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string>('');
    const {tenant} = useAuth();

    useEffect(()=>{
      setError('');
      
      getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/allCategories`) 
      .then(res=>{
        
        const tmpCategories : TextCategory[] = res.data.Categories.map((category : any) => {
          return(
            {
              idCategory: category.id,
            }
          )
        })
         setCategories(tmpCategories);  
         console.log(tmpCategories);
         setFilteredCategories(tmpCategories);
      })
      .catch(error=>{
        console.log(error); 
        setError('Error fetching categories.');
      })
    }, [tenant.id, error]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
      };

    const handleUpdate = (idCat: string) => {
        setCategories(categories.filter((category) => category.idCategory !== idCat));
    }

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
              <Grid item xs={12}>
                <TextCategoriesList  categories={categories} searchFilter={searchQuery} updateList={handleUpdate}/>
              </Grid>
          </Box>
          </Grid>
           </LayoutWrapper>
     </PrivateRoute>
    );
}
