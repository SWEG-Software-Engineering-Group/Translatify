import { Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton } from '@mui/material';
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import User from '../../../types/User';
import { useNavigate } from 'react-router-dom';
import Users from './UserList/UserList';
import { grid } from '../../../utils/MUI/gridValues';

interface ListProps{
    users : User[];
}



export default function UserList({users} : ListProps){
const [open, setOpen] = useState<boolean>(false);

const navigate = useNavigate();

function deleteUser(){
    
}
function createUser(){
    navigate('/CreateUser');
}


return(
        <Card>
            <CardHeader
                title="Users"
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
                    <Users users={users} />
                    <Button variant="contained" color="success" onClick={createUser} fullWidth sx={{marginTop:grid.rowSpacing}}>
                        Add User
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    )
};