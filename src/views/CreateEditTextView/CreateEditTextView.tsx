import {useState, useEffect} from "react";
import { Form, useParams } from "react-router-dom";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import { getData } from "../../services/axios/axiosFunctions";

export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [links, setLinks] = useState<string>('');
    const [secondaryLanguages, setSecondaryLanguages] = useState<string[]>([]);


    const { textId } = useParams<{ textId: string }>();
    useEffect(()=>{
        if(textId){
            //API for getting data of Text with id == textId 
            //then it set the starting values as such
            setCategory(textId); //will use params or props to determine the old category for editing (used textId just to show that it works)
            setSecondaryLanguages(['ita', 'jap', 'eng']); //same as above here
            // setText(res.text);
            // setComments(res.comments);
            // setLinks(res.links);
        }
    }, [])


    //LOGIC
    //(functions)
    const handleSubmit = () => {
        //API that handles text creation or text edit using Text type with State as "Verified"
    }

    //UI
    return(
        <>
            <form>
                <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder='text'/>
                <input type="text" value={comments} onChange={(event) => setComments(event.target.value)} placeholder='comments'/>
                <input type="text" value={links} onChange={(event) => setLinks(event.target.value)} placeholder='links'/>
                <input type="submit" value="Submit" onSubmit={handleSubmit}/>
            
            <div>
            Category picked: {category}
                {category && <CategoryInput oldData={category} onChange={setCategory} />}
                {!category && <CategoryInput onChange={setCategory} />}
            </div>
            
            {/* {secondaryLanguages} */}
            {secondaryLanguages && <MultipleLanguagesPicker onChange={setSecondaryLanguages} oldData={secondaryLanguages}/>}
            </form>
        </>
    )
}