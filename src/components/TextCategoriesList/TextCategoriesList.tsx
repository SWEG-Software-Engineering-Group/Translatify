import TextCategory from "../../types/TextCategory";
import { Grid, Box } from "@mui/material";
import TextCategoriesListItem from "./TextCategoriesListItem/TextCategoriesListItem";

type Props = {
    categories: TextCategory[];
    searchFilter: string;
};

export default function TextCategoriesList({ categories, searchFilter }: Props) {

    const handleDelete = (idCat: string) => {
        console.log(idCat);
        console.log("ciao");
    }
    
    function filterCategories() {
         const filtered = categories.filter((category) => {
          if (category.idCategory.toLowerCase().includes(searchFilter.toLowerCase())) {
            return true;
          }
          return false;
        });
        return filtered;
    }
    
    const filteredCategories = filterCategories();

    return (
        <div>
            <Box padding={2}>
                {/* <Grid container spacing={2}>
                    {textCategories?.map((category : TextCategory) => (
                        <Grid item xs={12} key={category.idCategory}>
                            <Box width="100%" marginBottom={2}>
                                <TextCategoriesListItem 
                                    category={category} 
                                    handleDeleteFromList={(idCat: string) => handleDelete(idCat)}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid> */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredCategories.length ? (
                  filteredCategories.map((category) => (
                  <Grid item xs={12} key={category.idCategory}>
                   <TextCategoriesListItem 
                                    category={category} 
                                    handleDeleteFromList={(idCat: string) => handleDelete(idCat)}
                                />
              </Grid>
          ))
            ) : (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                <p>No categories found</p>
              </Grid>
            )}
            </Grid>
                
            </Box>
        </div>
    )
}

 {/* <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredCategories.length ? (
                  filteredCategories.map((category) => (
                  <Grid item xs={12} key={category.idCategory}>
                   <TextCategoriesList textCategories={categories}/>
              </Grid>
          ))
            ) : (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                <p>No categories found</p>
              </Grid>
            )}
            </Grid> */}