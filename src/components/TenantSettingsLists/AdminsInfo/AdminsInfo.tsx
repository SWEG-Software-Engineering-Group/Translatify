import { Card , CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AdminList from "./AdminList/AdminList";
import User from '../../../types/User';

interface AdminsInfoProps{
    adminsIds : string[];
}

export default function AdminsInfo({adminsIds} : AdminsInfoProps){
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
            <CardContent>
                <AdminList adminsIds={adminsIds} />
            </CardContent>
        </Collapse>
    </Card>
    )
};