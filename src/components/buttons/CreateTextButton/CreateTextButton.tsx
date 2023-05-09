import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom";

export default function CreateTextButton() {
    const navigate = useNavigate();  

    const handleClick = () => {
      navigate('/write');
    };

    return(
        <Fab color="primary" aria-label="add" onClick={handleClick}
            sx={{
                position:'fixed',
                bottom:'1.5rem',
                right:'1.5rem'
            }}
        >
            <AddIcon />
        </Fab>
    )
}