import { Grid, Paper, Typography} from '@mui/material';
import User from '../../../../../types/User';
import { grid } from '../../../../../utils/MUI/gridValues';

interface AdminListItemProps {
    admin: User;
    isAdmin?: boolean;
  }
  
export default function AdminListItem({ admin, isAdmin = false }: AdminListItemProps) {
    return (
        <>
            <Paper sx={{ p: 2 }}>
                <Grid container spacing={grid.rowSpacing} alignItems="center" justifyContent="center" >
                    <Grid item xs={9} alignItems="center">
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
        </>
    );
}
  