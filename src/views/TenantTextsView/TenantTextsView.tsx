import {useState, useEffect} from "react";
import Picker from "../../components/Picker/Picker";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";
import {categories, languages, textStates, userType} from "./testData"
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";
import TextState from "../../types/TextState";
import convertTextState from "../../utils/Text/convertTextState";

export default function TenantTextsView() {
    //HOOKS

    const textStates : string[] = Object.keys(TextState).filter(state => isNaN(Number(state))).map(state => convertTextState(state));
    const [pickedCategory, setPickedCategory] = useState<string>();
    const [pickedLanguage, setPickedLanguage] = useState<string>();
    const [pickedTextState, setPickedTextState] = useState<string>();

    useEffect(()=>{
        //call api to get data and sets them
        setPickedCategory(categories[0]);
        setPickedLanguage(languages[0]);
        setPickedTextState(textStates[0]);
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
                    id = {'state'}
                    value={pickedTextState || 'All'}
                    onChange={(event)=>setPickedTextState(event.target.value)}
                    choices={userType === 'user' ? textStates.slice(0, -1) : textStates}
                />
                <CreateTextButton />
            </div>
            <div>
                <TextList />
            </div>
        </>
    )
}