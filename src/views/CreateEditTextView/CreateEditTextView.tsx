import { useState, useEffect } from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
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
import { getData, postData, putData } from "../../services/axios/axiosFunctions";
import replaceComboSymbolWithSpaces from "../../utils/replaceComboSymbolWithSpaces";
import Category from "../../types/Category";

interface FormState{
    Title: string,
    Text : string,
    Comment : string,
    Link : string,
    Category : string,
    Languages : string[],
    Feedback ?: string,
}

export default function CreateEditTextView() {
    //HOOKS

    const [formData, setFormData] = useState<FormState>({
        Title: '',
        Text : '',
        Comment : '',
        Link : '',
        Category : '',
        Languages : [],
        Feedback : '',
    });

    const { categoryId } = useParams<{ categoryId: string }>();
    const { textTitle } = useParams<{ textTitle: string }>();
    const title = textTitle ? replaceComboSymbolWithSpaces(textTitle) : '';
    const [languages, setLanguages] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
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
            if (Array.isArray(res.data.languages)) {
                setLanguages(res.data.languages);
            } else {              
            }
            getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/allCategories`)
            .then((res) => {
                setCategories(res.data.Categories.map((cat : Category) => cat.name));                    
                if(textTitle){
                    getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/category/${categoryId}/${title}/translationLanguages`)
                    .then((res) => {                    
                        setSelectedLanguages(res.data.response);
                        let tmpLangs = res.data.response;
                        getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${auth.tenant.defaultLanguage}/${categoryId}/${title}/text`)
                        .then((res) => {
                            const newData : FormState = {
                                Title: res.data.Text.title,
                                Text : res.data.Text.text,
                                Comment : res.data.Text.comment,
                                Link : res.data.Text.link,
                                Category : res.data.Text.category.name,
                                Feedback : res.data.Text.feedback,
                                Languages: tmpLangs,
                            }
                            setFormData(newData);
                        })
                        .catch((err) => {
                            throw(err);
                        })
                    })
                    .catch((err) => {
                        throw(err);
                    })
                }
                })
            .catch((err) => {
                throw(err);
            })
        })
        .catch((err) => {
            console.error(err, "ERR");            
        });
      }, []);

    //LOGIC
    //(functions)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //API that handles text creation or text edit using Text type with State as "Verified"
        //if worked redirect to other page, else show error
        let data = formData;
        data.Title = data.Title.trim();
        data.Category = data.Category.trim();
        delete data.Feedback;
        let action;
        if(!textTitle){
            action = () => postData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/originalText`, data );
        }
        else{
            action = () => putData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/category/${categoryId}/${title}/originalText`, data );
            setSnackbarMessage('Text updated successfully!');
        }
        action()
        .then(res=>{
            setDisableSubmit(true);
            setSnackbarOpen(true);
            setTimeout(() => {
                setDisableSubmit(false);
                navigate(-1);
            },1000);        
        })
        .catch(err=>{
            setSnackbarErrorOpen(true);
        })        
    }
        
    const handleCategoryChange = (category : string)=>{
        setFormData({...formData, Category: category})
    }

    const handleLanguagesChange = (languagesPicked : string[])=>{
        setFormData({...formData, Languages: languagesPicked})
    }

    //UI
    return(
        <PrivateRoute allowedUsers={['admin']}>
            <LayoutWrapper userType={auth.user.group}>
                <Grid container rowSpacing={grid.rowSpacing} direction={'column'} paddingBottom={'2rem'}>
                    <Grid item xs={grid.fullWidth} textAlign={"center"}>
                        {textTitle ?
                            <PageTitle title='Edit Text'/>
                            :
                            <PageTitle title='Create New Text'/>
                        }
                    </Grid>
                    <Grid item xs={grid.fullWidth} textAlign={"center"}>
                        <TextField
                            fullWidth
                            onChange={(event) => setFormData({...formData, Title: event.target.value})}
                            value={formData.Title}
                            type={'text'}
                            label="Text title"
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction={"row"} spacing={grid.rowSpacing}>
                            <Grid item xs={grid.fullWidth} md={grid.twoThirds}>
                                <Grid container rowSpacing={grid.rowSpacing}>
                                    <Grid item xs={12}>
                                        <TextField
                                            rows={4}
                                            multiline
                                            fullWidth
                                            onChange={(event) => setFormData({...formData, Text: event.target.value})}
                                            value={formData.Text}
                                            type={'text'}
                                            label="New text to add..."
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            rows={4}
                                            multiline
                                            fullWidth
                                            onChange={(event) => setFormData({...formData, Comment: event.target.value})}
                                            value={formData.Comment}
                                            type={'text'}
                                            label="Comments about the new text..."
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            rows={4}
                                            multiline
                                            fullWidth
                                            onChange={(event) => setFormData({...formData, Link: event.target.value})}
                                            value={formData.Link}
                                            type={'text'}
                                            label="Links related to the new text..."
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={grid.fullWidth} md={grid.oneThird}>
                                <Grid container justifyContent={'space-between'} direction={'column'} height={'100%'} wrap="nowrap" rowSpacing={grid.rowSpacing}>
                                    <Grid item xs={grid.fullWidth}>
                                        <CategoryInput categories={categories} previousCategory={formData.Category} onChange={handleCategoryChange} />
                                    </Grid>
                                    <Grid item xs={grid.fullWidth}>
                                        <MultipleLanguagesPicker onChange={handleLanguagesChange} previousSelectedLanguages={formData.Languages} languages={languages}/>
                                    </Grid>
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