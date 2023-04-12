import { useState, useEffect } from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import {secondaryLanguages, selectedLanguages, data} from './testData';
import { Grid, TextField, Typography } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { grid } from "../../utils/MUI/gridValues";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

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
    const { textId } = useParams<{ textId: string }>();

    // Determine the userType based on the pathname
    const userType = 'admin';

    useEffect(()=>{        
        let prevData : FormState = formData;
        if(textId){
            data.id = textId;
            //API for getting data of Text with id == textId 
            //then it set the starting values as such            
            prevData = {...prevData, pickedSecondaryLanguages : selectedLanguages}; //same as above here
            prevData = {...prevData, text : data.text};
            if(data.comment) prevData = {...prevData, comment : data.comment};
            if(data.link) prevData = {...prevData, link: data.link};
            if(data.feedback) prevData = {...prevData, feedback : data.feedback};
        }
        if(textCategoryId) prevData.category = textCategoryId;
        setFormData(prevData);
    }, [textCategoryId, textId])  //DONT ADD formData!!!
    
    //LOGIC
    //(functions)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //API that handles text creation or text edit using Text type with State as "Verified"
        //if worked redirect to other page, else show error
    }
        
    const handleCategoryChange = (category : string)=>{
        setFormData({...formData, category: category})
    }

    const handlePickedSecondaryLanguagesChange = (languagesPicked : string[])=>{
        setFormData({...formData, pickedSecondaryLanguages: languagesPicked})
    }

    //UI
    return(
        <LayoutWrapper userType={userType}>
            <Grid container rowSpacing={grid.rowSpacing} direction={'column'}>
                <Grid item xs={grid.fullWidth} textAlign={"center"}>
                    {textId ? 
                        <PageTitle title='Edit Text Page'/>
                        :
                        <PageTitle title='Text Creation Page'/>
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
                                <MultipleLanguagesPicker onChange={handlePickedSecondaryLanguagesChange} previousSelectedLanguages={formData.pickedSecondaryLanguages} languages={secondaryLanguages}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
                        <DiscardButton />
                        <SubmitButton handleSubmit={handleSubmit} value={textId ? 'Update' : 'Create'}/>
                    </Grid>
                </Grid>
            </Grid>       
        </LayoutWrapper>
    )
}