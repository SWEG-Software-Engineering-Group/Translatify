import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material" 

export default function DiscardButton() {
    //HOOKS
    const navigate = useNavigate();

    //LOGIC
    //(functions)


    //UI
    return(
        <Button color={'error'} variant={'outlined'} onClick={() => navigate('/TenantTexts')}>Discard</Button>
    )
}