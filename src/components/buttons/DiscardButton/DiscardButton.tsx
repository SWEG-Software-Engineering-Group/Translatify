import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material" 

export default function DiscardButton() {
    //HOOKS
    const navigate = useNavigate();

    //LOGIC
    //(functions)


    //UI
    return(
        <Button sx={{flexGrow:1}} color={'error'} variant={'outlined'} onClick={() => navigate('/TenantTexts')}>Discard</Button>
    )
}