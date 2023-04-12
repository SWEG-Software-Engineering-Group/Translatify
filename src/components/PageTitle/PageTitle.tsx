import { Typography } from "@mui/material";

interface TitleProps{
    title : string,
}

export default function PageTitle({title} : TitleProps){
    return <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 2 }}>{title}</Typography>
};