import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material" 

interface DiscardButtonProps{
    handleSubmit: (event : React.FormEvent<HTMLFormElement>) => void,
    value: string,
}

export default function SubmitButton({handleSubmit, value} : DiscardButtonProps) {
    //HOOKS

    //LOGIC
    //(functions)


    //UI
    return(
        <Button sx={{flexGrow:1}} variant="contained" onClick={(event) => handleSubmit}>{value}</Button>
    )
}