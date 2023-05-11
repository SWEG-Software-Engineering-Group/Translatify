import { Grid, Typography } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import UserListItem from './UserListItem/UserListItem';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { getData } from '../../../../services/axios/axiosFunctions';

interface UserListProps {
  tenantId ?: string;
  type ?: string;
}

export default function UserList({ tenantId, type = 'Users' }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const { tenant } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    let id = tenantId ? tenantId : (tenant && tenant.id);
    if (id) {
      getData(`${process.env.REACT_APP_API_KEY}/tenant/${id}/${type.toLowerCase()}`)
        .then((res) => {
          console.log(res.data[type], type);
          if(res.data[type]){
            const tmpUsers : User[] = res.data[type].map((user : any) => {
            return(
              {
                surname: user.UserAttributes[0].Value,
                username : user.UserAttributes[1].Value,
                name: user.UserAttributes[3].Value,
                group: type === 'Users' ? 'user' : 'admin' ,
                email : user.UserAttributes[4].Value,
              })
            })
            setUsers(tmpUsers);
          }        
        })
        .catch((error) => {
          console.error(error);
          setError('Error fetching users.');
        });
    }
  }, [tenant, tenantId, type]);

  const handleDelete = (userToBeDeleted: User) => {
    setUsers(users.filter((user) => user.username !== userToBeDeleted.username));
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!users.length) {
    return <Typography>No {type} found.</Typography>;
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
