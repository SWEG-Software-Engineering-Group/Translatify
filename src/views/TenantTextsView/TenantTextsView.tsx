import {useState, useEffect} from "react";
import Picker from "../../components/Picker/Picker";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";
import {categories, languages, textStatuses, userType} from "./testData"
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";

export default function TenantTextsView() {
    //HOOKS
    const [pickedCategory, setPickedCategory] = useState<string>();
    const [pickedLanguage, setPickedLanguage] = useState<string>();
    const [pickedTextStatus, setPickedTextStatus] = useState<string>();

    useEffect(()=>{
        //call api to get data and sets them
        setPickedCategory(categories[0]);
        setPickedLanguage(languages[0]);
        setPickedTextStatus(textStatuses[0]);
    }, [])


    //LOGIC
    //(functions)


    //UI
    return(
        <>
            <div>
                <Picker
                    id = {'category'}
                    value={pickedCategory || ''}
                    onChange={(event)=>setPickedCategory(event.target.value)}
                    choices={categories}
                />
                <Picker
                    id = {'language'}
                    value={pickedLanguage || ''}
                    onChange={(event)=>setPickedLanguage(event.target.value)}
                    choices={languages}
                />
                <Picker
                    id = {'status'}
                    value={pickedTextStatus || 'All'}
                    onChange={(event)=>setPickedTextStatus(event.target.value)}
                    choices={userType === 'user' ? textStatuses.slice(0, -1) : textStatuses}
                />
                <CreateTextButton />
            </div>
            <div>
                <TextList />
            </div>
        </>
    )
}