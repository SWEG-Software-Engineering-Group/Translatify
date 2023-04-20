import { Grid } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import UserListItem from './UserListItem/UserListItem';
import {useState, useEffect} from 'react';

interface UserListProps {
  usersIds: string[];
}

export default function UserList({ usersIds }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{

  },[])
  
  const handleDelete = (userToBeDeleted : User) => {
    setUsers(users.filter((user) => user.username !== userToBeDeleted.username));
  };

  return (
    <Grid container spacing={grid.rowSpacing}>
      {users.map((user) => {
        console.log(user);
        // return <Grid item xs={grid.fullWidth} key={user.username}>
        return <Grid item xs={grid.fullWidth} key={JSON.stringify(user)}>
          <UserListItem user={user} handleDelete={handleDelete}/>
        </Grid>}
      )}
    </Grid>
  );
}
