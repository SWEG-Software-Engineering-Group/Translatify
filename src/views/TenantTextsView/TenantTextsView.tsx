import {useState, useEffect} from "react";
import Picker from "../../components/Picker/Picker";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";
import {categories, languages, textStates, userType} from "./testData"
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";
import TextState from "../../types/TextState";
import convertTextState from "../../utils/Text/convertTextState";
import { Box, Grid } from "@mui/material";

import { grid } from "../../utils/MUI/gridValues";

export default function TenantTextsView() {
    //HOOKS

    const textStates : string[] = [''].concat(Object.keys(TextState).filter(state => isNaN(Number(state))).map(state => convertTextState(state)));
    const [pickedCategory, setPickedCategory] = useState<string>('');
    const [pickedLanguage, setPickedLanguage] = useState<string>('');
    const [pickedTextState, setPickedTextState] = useState<string>('');

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
        <div>
            <Grid container direction="column"
                rowSpacing={grid.rowSpacing}
                wrap="nowrap"
                height='100vh'
            >
                <Grid item>
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        columnSpacing={grid.columnSpacing}
                        rowSpacing={grid.rowSpacing}
                        alignItems="center"
                    >
                        <Grid item xs={grid.responsiveSmall} sm={grid.responsiveMedium}>
                            <Picker
                                id = {'category'}
                                value={pickedCategory || ''}
                                onChange={(event)=>setPickedCategory(event.target.value)}
                                choices={categories}
                            />
                        </Grid>
                        <Grid item xs={grid.responsiveSmall} sm={grid.responsiveMedium}>
                            <Picker
                                id = {'language'}
                                value={pickedLanguage || ''}
                                onChange={(event)=>setPickedLanguage(event.target.value)}
                                choices={languages}
                            />
                        </Grid>
                        <Grid item xs={grid.responsiveSmall} sm={grid.responsiveMedium}>
                            <Picker
                                id = {'state'}
                                value={pickedTextState || 'All'}
                                onChange={(event)=>setPickedTextState(event.target.value)}
                                choices={userType === 'user' ? textStates.slice(0, -1) : textStates}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item
                    xs={grid.fullWidth}
                    height='calc(90% - 4rem)'
                >
                    <TextList categoryFilter={pickedCategory} languageFilter={pickedLanguage} stateFilter={pickedTextState}/>
                </Grid>
            </Grid>
                    <CreateTextButton />
        </div>

    )
}
