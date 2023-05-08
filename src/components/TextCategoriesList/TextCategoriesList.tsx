import Category from "../../types/Category";
import { Grid, Box } from "@mui/material";
import TextCategoriesListItem from "./TextCategoriesListItem/TextCategoriesListItem";

type Props = {
    categories: Category[];
    searchFilter: string;
    updateList: (idCat: string) => void;
};

export default function TextCategoriesList({ categories, searchFilter, updateList }: Props) {

    const handleDelete = (idCat: string) => {
        updateList(idCat);
    }
    
    function filterCategories() {
         const filtered = categories.filter((category) => {
          if (category.name.toLowerCase().includes(searchFilter.toLowerCase())) {
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
                <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredCategories.length ? (
                  filteredCategories.map((category) => (
                  <Grid item xs={12} key={category.id}>
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
