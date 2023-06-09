import { Grid, Typography } from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import { useState, useEffect } from 'react';
import AdminListItem from './AdminListItem/AdminListItem';
import { getData } from '../../../../services/axios/axiosFunctions';
import { useAuth } from '../../../../hooks/useAuth';

interface AdminListProps {
  adminsIds?: string[];
}

export default function AdminList({ adminsIds }: AdminListProps) {
  const [admins, setAdmins] = useState<User[]>([]);
  const { tenant } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    if (!tenant) {
      return;
    }
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/admins`)
      .then((res) => {
        if(res.data.Admins){
          const tmpAdmins : User[] = res.data.Admins.map((user : any) => {
            return(
            {
              surname: user.UserAttributes[0].Value,
              username : user.UserAttributes[1].Value,
              name: user.UserAttributes[3].Value,
              group: 'admin' ,
              email : user.UserAttributes[4].Value,
            })
          })
          setAdmins(tmpAdmins);
          }
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching admins.');
      });
  }, [tenant]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!admins.length) {
    return <Typography>No admins found.</Typography>;
  }

  return (
    <Grid container spacing={grid.rowSpacing}>
      {admins.map((admin) => (
        <Grid item xs={grid.fullWidth} key={admin.username}>
          <AdminListItem admin={admin} />
        </Grid>
      ))}
    </Grid>
  );
}
