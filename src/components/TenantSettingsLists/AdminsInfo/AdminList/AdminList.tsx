import { Grid} from '@mui/material';
import User from '../../../../types/User';
import { grid } from '../../../../utils/MUI/gridValues';
import {useState, useEffect} from 'react';
import AdminListItem from './AdminListItem/AdminListItem';

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

