import {useState, useEffect} from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import { getData } from "../../services/axios/axiosFunctions";
import TranslationList from "../../components/TranslationList/TranslationList";
import { Button } from "@mui/material";
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import LogoutButton from '../../components/buttons/LogoutButton/LogoutButton';
//import { Form, useParams } from "react-router-dom";



export default function AdminReviewTextsView() {
    //HOOKS
    const [selectedLanguage, setSelectedLanguage] = useState('');



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
            <LanguagePicker
            id="language-select"
            value={selectedLanguage}
            onChange={(event)=>setSelectedLanguage(event.target.value)}
            //language picker specific for tenant
            //esempio di lingue selezionate per tenant: italiano, inglese, francese
            languages={["Italiano", "Inglese", "Francese"]}
            />
            <TranslationList />            
            <LogoutButton />
        </div>
   
    )
    
}