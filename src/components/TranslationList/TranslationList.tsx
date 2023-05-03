import { Grid } from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";
import TextCategory from "../../types/TextCategory";
import Text from "../../types/Text";

type Props = {
    translationList: Text[];
};

export default function TranslationList({ translationList }: Props) {
    return (
      <Grid container spacing={3}>
        {translationList.length !== 0 ?
            translationList.map((translation) => (
              <Grid item xs={12} md={6} lg={4} key={translation.title}>
               <ReviewCard translation={translation} />
              </Grid>
            ))          
          :
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
           <p>No translations found</p>
          </Grid>
        }
      </Grid>
    );
  }


