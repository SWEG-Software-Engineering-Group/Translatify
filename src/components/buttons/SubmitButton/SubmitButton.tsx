import { Button } from "@mui/material" 

interface SubmitButtonProps{
    handleSubmit: (event : React.FormEvent<HTMLFormElement>) => void,
    value: string,
    disabled?: boolean;
}

export default function SubmitButton({handleSubmit, value, disabled = false} : SubmitButtonProps) {
    return(
        <Button sx={{flexGrow:1}} variant="contained" type="submit" disabled={disabled} onClick={(event : any) => handleSubmit(event)}>{value}</Button>
    )
}
