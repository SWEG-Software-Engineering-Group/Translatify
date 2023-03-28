import {Grid} from "@mui/material"
import GoToSettings from "../../components/buttons/GoToLink/GoToSettings";
import GoToReview from "../../components/buttons/GoToLink/GoToReview";
import GoToTexts from "../../components/buttons/GoToLink/GoToTexts";

export default function AdminView()
{
    return (
        <Grid container
        spacing={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            <Grid item>
                <h1>Admin Main Page</h1>
            </Grid>
            <Grid item>
                <GoToSettings></GoToSettings>
            </Grid>
            <Grid item>
                <GoToReview></GoToReview>
            </Grid>
            <Grid item>
               <GoToTexts></GoToTexts>
            </Grid>

        </Grid>
    );
}
