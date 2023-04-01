import {useState, useEffect, useMemo} from "react";
import { useParams } from "react-router-dom";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import {secondaryLanguages, selectedLanguages} from './testData';
import { Grid, TextField } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { grid } from "../../utils/MUI/gridValues";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { useLocation } from 'react-router-dom';

export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [pickedSecondaryLanguages, setPickedSecondaryLanguages] = useState<string[]>([]);
    const { textId } = useParams<{ textId: string }>();
    const { textCategoryId } = useParams<{ textCategoryId: string }>();

    const { pathname } = useLocation();
    // Determine the userType based on the pathname
    const userType = pathname.includes('write') ? 'content' : 'admin';

    const { search } = useLocation();
    
    const { data } = useMemo(() => {
        const query = new URLSearchParams(search);
        return { data: JSON.parse(query.get('data') ?? '') };
    }, [search]);
    
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
                            <Grid item xs={grid.fullWidth}>
                                <MultipleLanguagesPicker onChange={setPickedSecondaryLanguages} previousSelectedLanguages={pickedSecondaryLanguages} languages={secondaryLanguages}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
                    <DiscardButton goTo={userType === 'admin' ? '/TenantTexts' : '/User'} />
                        <SubmitButton handleSubmit={handleSubmit} value={'Send Translation'}/>
                    </Grid>
                </Grid>
            </Grid>       
        </LayoutWrapper>
    )
}