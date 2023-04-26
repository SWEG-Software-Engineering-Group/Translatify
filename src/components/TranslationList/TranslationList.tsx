import { Grid } from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";
import TextCategory from "../../types/TextCategory";

type Props = {
    translationList: TextCategory[];
};

export default function TranslationList({ translationList }: Props) {
    return (
      <Grid container spacing={3}>
        {translationList.length !== 0 ?
          translationList.map((category) =>
            category.List.map((translation) => (
              <Grid item xs={12} md={6} lg={4} key={translation.id}>
               <ReviewCard translation={translation} />
              </Grid>
            ))
          )
          :
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
           <p>No translations found</p>
          </Grid>
        }
      </Grid>
    );
  }


