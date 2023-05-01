import { Grid, Typography } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import UserListItem from './UserListItem/UserListItem';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { getData } from '../../../../services/axios/axiosFunctions';

interface UserListProps {
  usersIds: string[];
}

export default function UserList({ usersIds }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const { tenant } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching users.');
      });
  }, [tenant.id]);

  const handleDelete = (userToBeDeleted: User) => {
    setUsers(users.filter((user) => user.username !== userToBeDeleted.username));
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!users.length) {
    return <Typography>No users found.</Typography>;
  }

  return (
    <Grid container spacing={grid.rowSpacing}>
      {users.map((user) => {
        return (
          <Grid item xs={grid.fullWidth} key={JSON.stringify(user)}>
            <UserListItem user={user} handleDelete={handleDelete} />
          </Grid>
        );
      })}
    </Grid>
  );
}
