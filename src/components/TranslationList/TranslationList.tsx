import { Grid } from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";
import TextCategory from "../../types/TextCategory";

type Props = {
    translationList: TextCategory[];
};

export default function TranslationList({ translationList }: Props) {
    return (
      <Grid container spacing={3}>
        {translationList.map((category) =>
          category.List.map((translation) => (
            <Grid item xs={12} md={6} lg={4} key={translation.id}>
              <ReviewCard translation={translation} />
            </Grid>
          ))
        )}
      </Grid>
    );
  }


