import { Grid, Paper, Typography} from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import {useState, useEffect} from 'react';
import { getData } from '../../../../services/axios/axiosFunctions';

interface AdminListProps {
  adminsIds: string[];
}

export default function AdminList({ adminsIds }: AdminListProps) {
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(()=>{
    //getData(`${process.env.REACT_APP_API_KEY}/user/`)
  },[])
  
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

interface AdminListItemProps {
  admin: User;
  isAdmin?: boolean;
}

function AdminListItem({ admin, isAdmin = false }: AdminListItemProps) {
  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={grid.rowSpacing} alignItems="center" justifyContent="center" >
          <Grid item xs={9} alignItems="center">
            <Typography variant="subtitle1">
              Username: {admin.username}
            </Typography>
            <Typography variant="subtitle1">Name: {admin.name}</Typography>
            <Typography variant="subtitle1">
              Surname: {admin.surname}
            </Typography>
            <Typography variant="subtitle1">Email: {admin.email}</Typography>
            {isAdmin && (
              <Typography variant="subtitle1">Role: {admin.group}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

    </div>
  );
}
