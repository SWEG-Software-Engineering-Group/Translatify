import {useState, useEffect} from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import { getData } from "../../services/axios/axiosFunctions";
import TranslationList from "../../components/TranslationList/TranslationList";
import { Button } from "@mui/material";
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import LogoutButton from '../../components/buttons/LogoutButton/LogoutButton';
import {translationsArrayForTesting, languages} from './testData';
import Picker from "../../components/Picker/Picker";
import Text from '../../types/Text';
//import { Form, useParams } from "react-router-dom";



export default function AdminReviewTextsView() {
    //HOOKS
    const[translationList, setTranslationList] = useState<Text[]>([]);
    const [pickedLanguage, setPickedLanguage] = useState<string>();
   
    useEffect(() => {
        setTranslationList(translationsArrayForTesting); 
        setPickedLanguage(languages[0]);
    }, []);

    useEffect(()=>{
        //call api to get data and sets them
        setPickedLanguage(languages[0]);
    }, [])

    //LOGIC
    //functions
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }


    //UI
    return(
        <div>
            <h2>Admin Review Texts Page</h2>
            <label htmlFor="language-select"></label>
            <Picker
                    id = {'language'}
                    value={pickedLanguage || ''}
                    onChange={(event)=>setPickedLanguage(event.target.value)}
                    choices={languages}
                />
            <TranslationList />            
            <LogoutButton />
        </div>
   
    )
    
}