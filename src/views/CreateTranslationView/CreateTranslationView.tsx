import {TextField, Grid, Button, Typography} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';

export default function EditOriginalTextView(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Admin');
    };

    return(
    <LayoutWrapper userType="admin">
        <Grid container wrap="nowrap" sx={{
            flexDirection:'column',
            gap:'2rem',
            translate: '',
            width: '95%',
            margin: 'auto',
        }}>
            <Grid item xs={12}>
                <Typography variant={'h4'} component={'h2'}>Original text</Typography>            
                <TextField required multiline rows={'5'} fullWidth label="Original text retrieved from backend">
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h2'}>Insert translation</Typography>            
                <TextField multiline rows={'5'} fullWidth >
                </TextField>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Send translation
            </Button>
        </Grid>
    </LayoutWrapper>
    )
}