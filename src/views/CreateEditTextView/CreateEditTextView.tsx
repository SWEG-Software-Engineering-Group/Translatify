import { useState, useEffect } from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import {data} from './testData';
import { Grid, TextField } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { grid } from "../../utils/MUI/gridValues";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { useAuth } from "../../hooks/useAuth";

import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { getData } from "../../services/axios/axiosFunctions";

interface FormState{
    text : string,
    comment : string,
    link : string,
    category : string,
    pickedSecondaryLanguages : string[],
    feedback : string,
}

export default function CreateEditTextView() {
    //HOOKS

    const [formData, setFormData] = useState<FormState>({
        text : '',
        comment : '',
        link : '',
        category : '',
        pickedSecondaryLanguages : [],
        feedback : '',
    });

    const { textCategoryId } = useParams<{ textCategoryId: string }>();
    const { textTitle } = useParams<{ textTitle: string }>();
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Text created successfully");
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useAuth();
    // Determine the userType based on the pathname

    useEffect(() => {        
        getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/secondaryLanguages`)
          .then((res) => {
            console.log(res);
            if (Array.isArray(res.data.languages)) {
              setLanguages(res.data.languages);
            } else {              
            }
          })
          .catch((err) => {
            console.error(err);            
          });
      }, []);


    useEffect(()=>{        
        let prevData : FormState = formData;
        if(textTitle){
            setSnackbarMessage("Text updated successfully")
            data.title = textTitle;
            //API for getting data of Text with id == textTitle 
            //then it set the starting values as such            
            prevData = {...prevData, pickedSecondaryLanguages : selectedLanguages}; //same as above here
            prevData = {...prevData, text : data.text};
            if(data.comment) prevData = {...prevData, comment : data.comment};
            if(data.link) prevData = {...prevData, link: data.link};
            if(data.feedback) prevData = {...prevData, feedback : data.feedback};
        }
        if(textCategoryId) prevData.category = textCategoryId;
        setFormData(prevData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textCategoryId, textTitle])  //DONT ADD formData!!!
    
    //LOGIC
    //(functions)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //API that handles text creation or text edit using Text type with State as "Verified"
        //if worked redirect to other page, else show error
        setDisableSubmit(true);
        setSnackbarOpen(true);
        setTimeout(() => {
            setDisableSubmit(false);
            navigate(-1);
        },1000);        
    }
        
    const handleCategoryChange = (category : string)=>{
        setFormData({...formData, category: category})
    }

    const handlePickedSecondaryLanguagesChange = (languagesPicked : string[])=>{
        setFormData({...formData, pickedSecondaryLanguages: languagesPicked})
    }

    //UI
    return(
        <PrivateRoute allowedUsers={['admin']}>
            <LayoutWrapper userType={auth.user.group}>
                <Grid container rowSpacing={grid.rowSpacing} direction={'column'}>
                    <Grid item xs={grid.fullWidth} textAlign={"center"}>
                        {textTitle ?
                            <PageTitle title='Edit Text'/>
                            :
                            <PageTitle title='Create New Text'/>
                        }
                    </Grid>
                    <Grid container direction={"row"} spacing={grid.rowSpacing}>
                        <Grid item xs={grid.fullWidth} md={grid.twoThirds}>
                            <Grid container rowSpacing={grid.rowSpacing}>
                                <Grid item xs={12}>
                                    <TextField
                                        rows={4}
                                        multiline
                                        fullWidth
                                        onChange={(event) => setFormData({...formData, text: event.target.value})}
                                        value={formData.text}
                                        type={'text'}
                                        label="New text to add..."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        rows={4}
                                        multiline
                                        fullWidth
                                        onChange={(event) => setFormData({...formData, comment: event.target.value})}
                                        value={formData.comment}
                                        type={'text'}
                                        label="Comments about the new text..."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        rows={4}
                                        multiline
                                        fullWidth
                                        onChange={(event) => setFormData({...formData, link: event.target.value})}
                                        value={formData.link}
                                        type={'text'}
                                        label="Links related to the new text..."
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={grid.fullWidth} md={grid.oneThird}>
                            <Grid container justifyContent={'space-between'} direction={'column'} height={'100%'} wrap="nowrap" rowSpacing={grid.rowSpacing}>
                                <Grid item xs={grid.fullWidth}>
                                    {formData.category !== null ? <CategoryInput previousCategory={formData.category} onChange={handleCategoryChange} /> : <CategoryInput onChange={handleCategoryChange} />}
                                </Grid>
                                <Grid item xs={grid.fullWidth}>
                                    <MultipleLanguagesPicker onChange={handlePickedSecondaryLanguagesChange} previousSelectedLanguages={formData.pickedSecondaryLanguages} languages={languages}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
                            <DiscardButton />
                            <SubmitButton disabled={disableSubmit} handleSubmit={handleSubmit} value={textTitle ? 'Update' : 'Create'}/>
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