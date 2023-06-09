import {TextField, Grid, Typography, Snackbar} from '@mui/material';
import { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import DiscardButton from '../../components/buttons/DiscardButton/DiscardButton';
import SubmitButton from '../../components/buttons/SubmitButton/SubmitButton';
import { grid } from "../../utils/MUI/gridValues";
import PageTitle from '../../components/PageTitle/PageTitle';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import { useAuth } from '../../hooks/useAuth';
import MuiAlert from '@mui/material/Alert';
import { getData, putData } from '../../services/axios/axiosFunctions';
import Text from '../../types/Text';

export default function CreateTranslationView(){
    const [formData, setFormData] = useState<Text>({
        idTenant: "",    
        language: "",
        category : {
            id: "",
            name: ""
        },
        title: "",
        text: "",
        state: 0,
        comment: "",
        link: "",
        feedback: "",
    });

    const [originalText, setOriginalText] = useState<Text>()
    const { textTitle } = useParams<{ textTitle: string }>();
    const title = textTitle ? decodeURI(textTitle) : '';
    const { categoryId } = useParams<{ categoryId: string }>();
    const { language } = useParams<{ language: string }>();    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<string>('');
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useAuth();    

    useEffect(()=>{
        if(textTitle){
            getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/${categoryId}/${title}/text`)
            .then(res=>{
                let data = res.data.Text;
                if(data.text === null || data.text === "null") data.text = '';
                setFormData(data);
                getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${auth.tenant.defaultLanguage}/${categoryId}/${title}/text`)
                .then(res=>{
                    setOriginalText(res.data.Text);
                })
                .catch(err=>{
                    throw(err);
                })
            })
            .catch(err=>{
                return <Navigate to='/accessDenied' />
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableSubmit(true);
        if(formData.text === null || formData.text.trim() === ''){
            setSnackbarErrorMessage("Please fill in all form fields");
            setSnackbarErrorOpen(true);
            setDisableSubmit(false)
        }
        else{
            putData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${formData.language}/${categoryId}/${title}/translation`, {Text : formData.text})
            .then(res=>{
                setSnackbarMessage('Translation updated successfully!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    setDisableSubmit(false);
                    navigate(-1);
                },1000);                    
            })
            .catch(err=>{
                setSnackbarErrorMessage("Something went wrong, try again later");
                setSnackbarErrorOpen(true);
                setDisableSubmit(false);
            })
        }
    };
    return(
    <PrivateRoute allowedUsers={['admin', 'user']}>
        <LayoutWrapper userType={auth.user.group}>
            <PageTitle title={`Edit ${formData.title} in ${formData.language}`}/>
            <Grid container wrap="nowrap" sx={{
                flexDirection:'column',
                gap:'2rem',
                translate: '',
                width: '95%',
                marginInline: 'auto',
                paddingBottom: '2rem'
            }}>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'} color='red'>Useful comment</Typography>
                    <Typography>
                        {formData.comment ?? 'No comment'}                        
                    </Typography>
                </Grid>
                {textTitle &&
                    <Grid item xs={12}>
                        <Typography variant={'h6'} component={'h2'} color='red'>Useful feedback</Typography>
                        <Typography>
                            {formData.feedback ?? 'No feedback'}                        
                        </Typography>
                    </Grid>}
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'} color='red'>Useful link</Typography>
                    <Typography>
                        {formData.link ?? 'No links'}                        
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'} color='red'>Original text</Typography>                                            
                    <Typography>
                        {originalText ? originalText.text : 'Missing original text'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'} color='red'>Insert translation</Typography>
                    <TextField
                        value={formData.text ?? ''}
                        required
                        multiline
                        rows={5}
                        onChange={(event)=>setFormData({...formData , text : event.target.value})}
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
                {snackbarErrorMessage}
                </MuiAlert>
            </Snackbar>
        </LayoutWrapper>
    </PrivateRoute>
    )
}