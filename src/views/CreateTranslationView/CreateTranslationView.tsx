import { Card, TextField, Grid, Button, Typography, List, ListItem} from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { display } from '@mui/system';
import { useState } from 'react';




export default function EditOriginalTextView(){

    const navigate = useNavigate();


    const handleClick = () => {
        // Poi puoi navigare verso la pagina del Tenant.
        navigate('/Admin');
      };


    return(
        <Grid container wrap="nowrap" sx={{
                flexDirection:'column',
                gap:'2rem',
                translate: '',
                width: '95%',
                margin: 'auto',
            }}>
            <Grid item xs={12}>
                <Typography variant={'h4'} component={'h2'}>Testo originale</Typography>            
                <TextField required multiline rows={'5'} fullWidth label="Testo originale recuperato dal backend">
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h2'}>Inserisci la traudzione</Typography>            
                <TextField multiline rows={'5'} fullWidth >
                </TextField>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Invia Traduzione 
            </Button>

        </Grid>
    )
}