import {TextField, Grid, Typography, Snackbar} from '@mui/material';
import { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import DiscardButton from '../../components/buttons/DiscardButton/DiscardButton';
import SubmitButton from '../../components/buttons/SubmitButton/SubmitButton';
import { grid } from "../../utils/MUI/gridValues";
import { data } from './testData';
import PageTitle from '../../components/PageTitle/PageTitle';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import { useAuth } from '../../hooks/useAuth';
import MuiAlert from '@mui/material/Alert';

interface FormState{
    originalText: string,
    translation: string,
    feedback: string,
    comment: string,
    link: string,
}

export default function CreateTranslationView(){
    const [formData, setFormData] = useState<FormState>({        
        originalText: '',
        translation: '',
        feedback: '',
        comment: '',
        link: '',
    });
    const auth = useAuth();
    
    const { textTitle } = useParams<{ textTitle: string }>();
    const { textCategoryId } = useParams<{ textCategoryId: string }>();
    const { language } = useParams<{ language: string }>();    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Translation created successfully");
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=>{    
        if(textTitle){
            data.title = textTitle;
            setSnackbarMessage("Translation updated successfully");
            //API for getting data of Text with id == textTitle 
            //then it set the starting values as such
            let prevData = formData;
            prevData = {...prevData, originalText : data.originalText, translation : data.translation};
            if(data.comment) prevData = {...prevData, comment : data.comment};
            if(data.link) prevData = {...prevData, link : data.link};
            setFormData(prevData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textCategoryId, textTitle, language])  //DONT ADD formData!!!

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableSubmit(true);
        //API that handles text creation or text edit using Text type with State as "Verified"
        //if worked redirect to other page, else show error
        setSnackbarOpen(true);
        setTimeout(() => {
            setDisableSubmit(false);
            navigate(-1);
        },3000);        
    };
    
    return(
    <PrivateRoute allowedUsers={['admin', 'user']}>
        <LayoutWrapper userType={auth.user.group}>
            <PageTitle title='Edit Translation'/>
            <Grid container wrap="nowrap" sx={{
                flexDirection:'column',
                gap:'2rem',
                translate: '',
                width: '95%',
                margin: 'auto',
            }}>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'}>Useful comment</Typography>
                    <TextField
                        value={formData.comment}
                        required
                        multiline
                        disabled
                        rows={5}
                        onChange={(event)=>setFormData({...formData , comment : event.target.value})}
                        fullWidth
                        label="Insert a comment related to the translation"
                    >
                    </TextField>
                </Grid>
                {textTitle &&
                    <Grid item xs={12}>
                        <Typography variant={'h6'} component={'h2'}>Useful feedback</Typography>
                        <TextField
                            multiline
                            fullWidth
                            disabled
                            rows={5}
                            onChange={(event) => setFormData({...formData, feedback: event.target.value})}
                            value={formData.feedback}
                            type={'text'}
                            label="Feedback related to the refused translation..."
                        />
                    </Grid>}
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'}>Useful link</Typography>
                    <TextField
                        value={formData.link}
                        required
                        disabled
                        multiline
                        rows={'5'}
                        onChange={(event)=>setFormData({...formData , link : event.target.value})}
                        fullWidth
                        label="Insert a link related to the translation"
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'}>Original text</Typography>
                    <TextField
                        value={formData.originalText}
                        required
                        multiline
                        rows={5}
                        onChange={(event)=>setFormData({...formData , originalText : event.target.value})}
                        fullWidth
                        label="Original text related to the translation"
                        disabled
                        inputProps={{readOnly: true}}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'}>Insert translation</Typography>
                    <TextField
                        value={formData.translation}
                        required
                        multiline
                        rows={5}
                        onChange={(event)=>setFormData({...formData , translation : event.target.value})}
                        fullWidth
                        label="Insert the translation"
                    >
                    </TextField>
                </Grid>
                <Grid item>
                    <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
                        <DiscardButton />
                        <SubmitButton disabled={disableSubmit} handleSubmit={handleSubmit} value={'Confirm'}/>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
                {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
                <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
                Something went wrong, try again later
                </MuiAlert>
            </Snackbar>
        </LayoutWrapper>
    </PrivateRoute>
    )
}