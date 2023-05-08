import { Grid } from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";
import Text from "../../types/Text";

type Props = {
    translationList: Text[];
    removeFromList: (title : string) => void;
};

export default function TranslationList({ translationList, removeFromList }: Props) {
    return (
      <Grid container spacing={3}>
        {translationList.length !== 0 ?
            translationList.map((translation) => (
              <Grid item xs={12} md={6} lg={4} key={translation.title}>
               <ReviewCard removeFromList={removeFromList} translation={translation} />
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


