import TextCategory from "../../types/TextCategory";
import { Grid, Box } from "@mui/material";
import TextCategoriesListItem from "./TextCategoriesListItem/TextCategoriesListItem";

type Props = {
    textCategories: TextCategory[];
};

export default function TextCategoriesList({ textCategories }: Props) {
    return (
        <div>
            <Box padding={2}>
                <Grid container spacing={2}>
                    {textCategories?.map((category : TextCategory) => (
                        <Grid item xs={12} key={category.idCategory}>
                            <Box width="100%" marginBottom={2}>
                                <TextCategoriesListItem category={category} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}