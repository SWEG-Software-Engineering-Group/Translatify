import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material" 

interface DiscardButtonProps{
    goTo : string
}

export default function DiscardButton({goTo} : DiscardButtonProps) {
    //HOOKS
    const navigate = useNavigate();

    //LOGIC
    //(functions)


    //UI
    return(
        <Button sx={{flexGrow:1}} color={'error'} variant={'outlined'} onClick={() => navigate(goTo)}>Discard</Button>
    )
}