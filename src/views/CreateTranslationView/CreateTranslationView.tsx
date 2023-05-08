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
import replaceComboSymbolWithSpaces from '../../utils/replaceComboSymbolWithSpaces';
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
    const title = textTitle ? replaceComboSymbolWithSpaces(textTitle) : '';
    const { categoryId } = useParams<{ categoryId: string }>();
    const { language } = useParams<{ language: string }>();    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useAuth();    

    useEffect(()=>{
        console.log('ahhhhhhhhhh');
        if(textTitle){
            getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/${categoryId}/${title}/text`)
            .then(res=>{
                setFormData(res.data.Text);
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
        putData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${formData.language}/${categoryId}/${title}/translation`, formData.text)
        .then(res=>{
            setSnackbarOpen(true);
            setTimeout(() => {
                setDisableSubmit(false);
                navigate(-1);
            },1000);                    
        })
        .catch(err=>{
            setSnackbarErrorOpen(true);
            setDisableSubmit(false);
        })
    };
    console.log(formData);
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
                    <Typography variant={'h6'} component={'h2'}>Useful comment</Typography>
                    <TextField
                        value={formData.comment ?? 'No comment'}
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
                            value={formData.feedback  ?? 'No Feedback'}
                            type={'text'}
                            label="Feedback related to the refused translation..."
                        />
                    </Grid>}
                <Grid item xs={12}>
                    <Typography variant={'h6'} component={'h2'}>Useful link</Typography>
                    <TextField
                        value={formData.link  ?? 'No links'}
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
                        value={originalText ? originalText.text : 'Missing original text'}
                        multiline
                        rows={5}                        
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
                Translation updated successfully
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