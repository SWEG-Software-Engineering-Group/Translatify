import {useState, useEffect} from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";

export default function CreateEditTextView() {
    //HOOKS
    const [category, setCategory] = useState<string>('');
    useEffect(()=>{
        //algorithm 
    }, [])


    //LOGIC
    //(functions)


    //UI
    return(
        <>
            {category}            
            <CategoryInput onChange={setCategory} />
        </>
    )
}