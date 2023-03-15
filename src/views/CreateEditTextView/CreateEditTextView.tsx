import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import data from './testData'

export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [link, setLinks] = useState<string>('');
    const [pickedSecondaryLanguages, setPickedSecondaryLanguages] = useState<string[]>([]);

    
    const { textId } = useParams<{ textId: string }>();

    useEffect(()=>{
        if(textId){
            data.id = textId;
            //API for getting data of Text with id == textId 
            //then it set the starting values as such
            setCategory(data.id); //will use params or props to determine the old category for editing (used textId just to show that it works)
            setPickedSecondaryLanguages(['ita', 'jap', 'eng']); //same as above here
            setText(data.text);
            if(data.comment) setComment(data.comment);
            if(data.link) setLinks(data.link);
        }
    }, [])
    
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
            {/* Data:
            Text:{text} Comment:{comment} Links:{link} Category picked: {category}
             */}
            <div>
                {category && <CategoryInput oldData={category} onChange={setCategory} />}
                {!category && <CategoryInput onChange={setCategory} />}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder='text'/>
                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} placeholder='comment'/>
                <input type="text" value={link} onChange={(event) => setLinks(event.target.value)} placeholder='link'/>
            
                {pickedSecondaryLanguages.length>0 && <MultipleLanguagesPicker onChange={setPickedSecondaryLanguages} oldData={pickedSecondaryLanguages}/>}
            
                <input type="submit" value="Submit"/>
            </form>            
        </>
    )
}