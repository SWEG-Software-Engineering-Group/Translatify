import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTextButton() {
    //HOOKS
    const navigate = useNavigate();  
    
    //LOGIC
    //(functions)
    const handleClick = () => {
      navigate('/write');
    };


    //UI
    return(
        <Fab color="primary" aria-label="add" onClick={handleClick}>
            <AddIcon />
        </Fab>
    )
}