import { Button, Card, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList/UserList';
import { grid } from '../../../utils/MUI/gridValues';

interface ListProps{
    usersIds : string[];
}

export default function Users({usersIds} : ListProps){
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    function createUser(){
        navigate('/CreateUser');
    }

    return(
        <Card>
            <CardHeader
                title="User List"
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
                    <UserList usersIds={usersIds} />
                    <Button variant="contained" color="success" onClick={createUser} fullWidth sx={{marginTop:grid.rowSpacing}}>
                        Add User
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    )
};