import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import {data, secondaryLanguages, selectedLanguages} from './testData';

export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [link, setLinks] = useState<string>('');
    const [pickedSecondaryLanguages, setPickedSecondaryLanguages] = useState<string[]>([]);

    const { textId } = useParams<{ textId: string }>();
    const { textCategoryId } = useParams<{ textCategoryId: string }>();

    useEffect(()=>{        
        if(textId){
            data.id = textId;
            //API for getting data of Text with id == textId 
            //then it set the starting values as such            
            setPickedSecondaryLanguages(selectedLanguages); //same as above here
            setText(data.text);
            if(data.comment) setComment(data.comment);
            if(data.link) setLinks(data.link);
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
        <>            
            Data:
            Text:{text} Comment:{comment} Links:{link} Category picked: {category}
            
            <div>
                {category !== null ? <CategoryInput previousCategory={category} onChange={setCategory} /> : <CategoryInput onChange={setCategory} />}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder='text'/>
                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} placeholder='comment'/>
                <input type="text" value={link} onChange={(event) => setLinks(event.target.value)} placeholder='link'/>
            
                <MultipleLanguagesPicker onChange={setPickedSecondaryLanguages} previousSelectedLanguages={pickedSecondaryLanguages} languages={secondaryLanguages}/>
            
                <input type="submit" value="Submit"/>
            </form>            
        </>
    )
}