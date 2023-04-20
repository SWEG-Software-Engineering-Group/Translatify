import { Button, Card, CardContent, CardHeader, Collapse, IconButton} from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageList from "./LanguageList/LanguageList";



interface ListProps{
    oldLanguages : string[];    
}


export default function Languages({oldLanguages} : ListProps){
    const [open, setOpen] = useState<boolean>(false);

    function addLanguage(){
        
    }




    return(
        <Card>
        <CardHeader
            title="Languages"
            action={
                <IconButton
                    onClick={() => setOpen(!open)}
                    aria-label="expand"
                    size="small"
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            }
        >
        </CardHeader>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent>
                <LanguageList oldLanguages={oldLanguages ?? []} />
            </CardContent>
        </Collapse>
        </Card>
    )
};