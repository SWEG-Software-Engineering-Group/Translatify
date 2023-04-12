import { Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton } from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguagesItem from "../../LanguageList/LanguageList";
import { grid } from '../../../utils/MUI/gridValues';
import AdminListItem from "../../AdminListItem/AdminListItem";
import User from '../../../types/User';


interface ListProps{
    admins : User[];
}

export default function AdminInfoList({admins} : ListProps){
const [open, setOpen] = useState<boolean>(false);

return(
    <Card sx={{ border: 'none' }}>
        <CardHeader
            title="Admin Info"
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
            <AdminListItem users={admins} />
        </Collapse>
    </Card>
    )
};