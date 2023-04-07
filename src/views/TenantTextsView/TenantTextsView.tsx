import {useState, useEffect} from "react";
import Picker from "../../components/Picker/Picker";
import { categories, languages, userType } from "./testData"
import CreateTextButton from "../../components/buttons/CreateTextButton/CreateTextButton";
import TextList from "../../components/TextList/TextList";
import TextState from "../../types/TextState";
import convertTextState from "../../utils/Text/convertTextState";
import { Grid } from "@mui/material";
import { grid } from "../../utils/MUI/gridValues";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import TextSearch from "../../components/TextSearch/TextSearch";

export default function TenantTextsView() {
    //HOOKS
    const textStates : string[] = ['ALL'].concat(Object.keys(TextState).filter(state => isNaN(Number(state))).map(state => convertTextState(state)));
    const [pickedCategory, setPickedCategory] = useState<string>('ALL');
    const [pickedLanguage, setPickedLanguage] = useState<string>('ALL');
    const [pickedTextState, setPickedTextState] = useState<string>('ALL');
    const [pickedSearch, setPickedSearch] = useState<string>('');

    useEffect(()=>{
        //call api to get data and sets them
        setPickedCategory(categories[0]);
        setPickedLanguage(languages[0]);
        setPickedTextState(textStates[0]);
    }, [])

    return(
        <LayoutWrapper userType="admin">
            <Grid container direction="column"
                rowSpacing={grid.rowSpacing}
                wrap="nowrap"
                height='100vh'
                zIndex={1}
            >
                <Grid item>
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        columnSpacing={grid.columnSpacing}
                        rowSpacing={grid.rowSpacing}
                        alignItems="center"
                        zIndex={1}
                    >
                        <Grid item xs={grid.fullWidth} sm={grid.responsiveThreeInLine}>
                            <Picker
                                id = {'category'}
                                value={pickedCategory || 'ALL'}
                                onChange={(newValue : string)=>setPickedCategory(newValue)}
                                choices={categories}
                            />
                        </Grid>
                        <Grid item xs={grid.fullWidth} sm={grid.responsiveThreeInLine}>
                            <Picker
                                id = {'language'}
                                value={pickedLanguage || 'ALL'}
                                onChange={(newValue : string)=>setPickedLanguage(newValue)}
                                choices={languages}
                            />
                        </Grid>
                        <Grid item xs={grid.fullWidth} sm={grid.responsiveThreeInLine}>
                            <Picker
                                id = {'state'}
                                value={pickedTextState || 'ALL'}
                                onChange={(newValue : string)=>setPickedTextState(newValue)}
                                choices={userType === 'user' ? textStates.slice(0, -1) : textStates}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <TextSearch handleParentSearch={(newValue : string)=>{setPickedSearch(newValue)}} />
                </Grid>
                <Grid item
                    xs={grid.fullWidth}
                    height='calc(80% - 4rem)'
                >
                    <TextList categoryFilter={pickedCategory} languageFilter={pickedLanguage} stateFilter={pickedTextState} searchFilter={pickedSearch}/>
                </Grid>
            </Grid>
            <CreateTextButton />
        </LayoutWrapper>
    )
}
