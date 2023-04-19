import { Button, Card, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguagesItem from "./LanguageList/LanguageList";
import { grid } from '../../../utils/MUI/gridValues';

interface ListProps{
    languages : string[];
}


export default function LanguageList({languages} : ListProps){
const [open, setOpen] = useState<boolean>(false);

function createLanguage(){
      
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
            <LanguagesItem languages={languages ?? []} />
                <Button variant="contained" color="success" onClick={createLanguage} fullWidth sx={{marginTop:grid.rowSpacing}}>
                    Add new language
                </Button>
        </CardContent>
    </Collapse>
</Card>
    )
};