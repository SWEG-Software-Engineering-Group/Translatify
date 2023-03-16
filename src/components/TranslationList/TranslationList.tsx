import {useState, useEffect} from "react";
import Text from "../../types/Text";
import { TextState } from "../../types/TextState";
import TranslationListItem from "./TranslationListItem/TranslationListItem";

export default function TraslationList() {

    //HOOKS
    const [translations, setTranslations] = useState<Text[]>([]);
    const [translationsListItems, setTranslationsListItems] = useState<any[]>([]);

    useEffect(() => {
        //chiamata api per avere l'elenco di tenant dal DB
        setTranslations(translationsArrayForTesting);
    },[]);

    useEffect(()=>{
        if (translations) {
            const newTranslationsListItem = translations.map((translations : Text) => (
                <TranslationListItem {...translations} />
            ));
            setTranslationsListItems(() => newTranslationsListItem);
        }
    }, [translations]);

    //LOGIC
    
    let translationsArrayForTesting : Text[] = [{
       id: 't1',
       text: 'ciao',
       state: TextState.toBeVerified,
       feedback: 'ciao',
       comment: 'ciao',
       link: 'ciao',
    },
    {
       id: 't2',
       text: 'ciao2',
       state: TextState.toBeVerified,
       feedback: 'ciao2',
       comment: 'ciao2',
       link: 'ciao2',
    
    }];

    //UI
    return(
        <div>
            {translations && translationsListItems}
        </div>
    )
}