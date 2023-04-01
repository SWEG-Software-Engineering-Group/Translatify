import { Button } from "@mui/material" 

interface SubmitButtonProps{
    handleSubmit: (event : React.FormEvent<HTMLFormElement>) => void,
    value: string,
}

export default function SubmitButton({handleSubmit, value} : SubmitButtonProps) {
    return(
        <Button sx={{flexGrow:1}} variant="contained" onClick={(event) => handleSubmit}>{value}</Button>
    )
}
