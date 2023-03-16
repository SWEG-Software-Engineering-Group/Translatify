import {useState, useEffect} from "react";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import MultipleLanguagesPicker from "../../components/MultipleLanguagesPicker/MultipleLanguagesPicker";
import { getData } from "../../services/axios/axiosFunctions";
import TranslationList from "../../components/TranslationList/TranslationList";
import { Button } from "@mui/material";
//import { Form, useParams } from "react-router-dom";



export default function AdminReviewTextsView() {
    //HOOKS
    const [selectedLanguage, setSelectedLanguage] = useState('');



    //LOGIC
    //functions
    const handleApprove = () => {
    
    }


    //UI
    return(
        <div>
            <h2>Admin Review Texts Page</h2>
            <TranslationList />            
        </div>
   
    )
    
}