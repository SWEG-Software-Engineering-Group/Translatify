import { Grid } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import UserListItem from './UserListItem/UserListItem';
import {useState} from 'react';

interface UserListProps {
  oldUsers: User[];
}

export default function UserList({ oldUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(oldUsers);
  
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
