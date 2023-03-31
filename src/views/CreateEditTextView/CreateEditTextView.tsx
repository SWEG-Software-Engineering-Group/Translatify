import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import {data, secondaryLanguages, selectedLanguages} from './testData';
import { Grid, TextField } from "@mui/material";

import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { grid } from "../../utils/MUI/gridValues";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";


export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [pickedSecondaryLanguages, setPickedSecondaryLanguages] = useState<string[]>([]);

    const { textId } = useParams<{ textId: string }>();
    const { textCategoryId } = useParams<{ textCategoryId: string }>();


    const userType = 'admin';
    
    useEffect(()=>{        
        if(textId){
            data.id = textId;
            //API for getting data of Text with id == textId 
            //then it set the starting values as such            
            setPickedSecondaryLanguages(selectedLanguages); //same as above here
            setText(data.text);
            if(data.comment) setComment(data.comment);
            if(data.link) setLink(data.link);
        }
        if(textCategoryId) setCategory(textCategoryId);
    }, [textCategoryId, textId])
    
    //LOGIC
    //(functions)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //API that handles text creation or text edit using Text type with State as "Verified"
        //if worked redirect to other page, else show error
    }
        
    //UI
    return(
        // <>            
        //     Data:
        //     Text:{text} Comment:{comment} Links:{link} Category picked: {category}
            
        //     <div>
        //         {category !== null ? <CategoryInput previousCategory={category} onChange={setCategory} /> : <CategoryInput onChange={setCategory} />}
        //     </div>
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder='text'/>
        //         <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} placeholder='comment'/>
        //         <input type="text" value={link} onChange={(event) => setLink(event.target.value)} placeholder='link'/>
            
        //         <MultipleLanguagesPicker onChange={setPickedSecondaryLanguages} previousSelectedLanguages={pickedSecondaryLanguages} languages={secondaryLanguages}/>
            
        //         <input type="submit" value="Submit"/>
        //     </form>            
        // </>

        <LayoutWrapper userType={userType}>
            <Grid container rowSpacing={grid.rowSpacing} direction={'column'}>
                <Grid container direction={"row"} spacing={grid.rowSpacing}>
                    <Grid item xs={grid.fullWidth} md={grid.twoThirds}>
                        <Grid container rowSpacing={grid.rowSpacing}>
                            <Grid item xs={12}>
                                <TextField
                                    rows={4}
                                    multiline
                                    fullWidth
                                    onChange={(event) => setText(event.target.value)}
                                    value={text}
                                    type={'text'}
                                    label="New text to add..."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    rows={4}
                                    multiline
                                    fullWidth
                                    onChange={(event) => setComment(event.target.value)}
                                    value={comment}
                                    type={'text'}
                                    label="Comments about the new text..."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    rows={4}
                                    multiline
                                    fullWidth
                                    onChange={(event) => setLink(event.target.value)}
                                    value={link}
                                    type={'text'}
                                    label="Links related to the new text..."
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={grid.fullWidth} md={grid.oneThird}>
                        <Grid container justifyContent={'space-between'} direction={'column'} height={'100%'} wrap="nowrap" rowSpacing={grid.rowSpacing}>
                            <Grid item xs={grid.fullWidth}>
                                {category !== null ? <CategoryInput previousCategory={category} onChange={setCategory} /> : <CategoryInput onChange={setCategory} />}
                            </Grid>
                            <Grid item xs={grid.fullWidth} marginX={'auto'}>
                                <MultipleLanguagesPicker onChange={setPickedSecondaryLanguages} previousSelectedLanguages={pickedSecondaryLanguages} languages={secondaryLanguages}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent={'space-between'}>
                        <DiscardButton />
                        <SubmitButton handleSubmit={handleSubmit} value={'Submit'}/>
                    </Grid>
                </Grid>
            </Grid>       
        </LayoutWrapper>
    )
}