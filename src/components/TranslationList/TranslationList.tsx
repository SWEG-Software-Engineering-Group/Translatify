import {useState, useEffect} from "react";
import Text from "../../types/Text";
import TextState  from "../../types/TextState";
import TranslationListItem from "./TranslationListItem/TranslationListItem";
import Grid from '@mui/material/Grid';
import ReviewCard from "../ReviewCard/ReviewCard";

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
            const newTranslationsListItem = translations.map((translation : Text) => (
                <TranslationListItem translation={translation} />                
            ));
            setTranslationsListItems(() => newTranslationsListItem);
        }
    }, [translations]);

    //LOGIC
    
    let translationsArrayForTesting : Text[] = [{
       id: 'La mia prima traduzione',
       text: 'Questa è la prima traduzione, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
       state: TextState.toBeVerified,
       feedback: 'feedback1',
       comment: 'Non ci sono commenti',
       link: 'ciao',
    },
    {
       id: 'La mia seconda traduzione',
       text: 'Questa è la seconda traduzione, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
       state: TextState.toBeVerified,
       feedback: 'feedback2',
       comment: 'Non ci sono commenti',
       link: 'ciao2',    
    },
    {
        id: 'La mia terza traduzione',
        text: 'Questa è la terza traduzione, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        state: TextState.toBeVerified,
        feedback: 'feedback3',
        comment: 'Non ci sono commenti',
        link: 'ciao3',    
     }
];

    //UI
    return(
        <>
            <Grid container spacing={3}>
                {translations.map(translation => (
                     <Grid item xs={12} md={6} lg={4}>
                     <ReviewCard translation={translation} />
                 </Grid>
                ))}
            </Grid>
        </>

    )
}