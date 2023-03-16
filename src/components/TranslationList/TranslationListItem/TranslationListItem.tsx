import {useState, useEffect} from "react";
import Text from "../../../types/Text";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TranslationListItem(props: Text) {
    //HOOKS

    //LOGIC
    const handleConfirm = () => {
    
    }

    //UI

   
    return(
        <Card variant="outlined" sx={{ width: 250, height: 160, border: '1px solid grey'}} style={{margin: '10px'}}>
        <CardContent>
            <Typography variant="h5" component="div">
                <span>Traduzione: {props.id}</span>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.state}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" color="success" onClick={handleConfirm}>
            Approve
            </Button>
            <Button size="small" variant="contained" color="error">
            Disapprove
            </Button>
        </CardActions>
        </Card>
    )
};