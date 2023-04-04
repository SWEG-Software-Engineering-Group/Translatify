import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material" 

export default function DiscardButton() {
    const navigate = useNavigate();

    return(
        <Button sx={{flexGrow:1}} color={'error'} variant={'outlined'} onClick={() => navigate(-1)}>Discard</Button>
    )
}