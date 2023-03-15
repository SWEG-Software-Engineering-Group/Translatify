import { List, ListItem, ListItemText } from '@mui/material';
import User from '../../types/User';

interface UserListProps {
    users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <List>
        {users.map(user => (
            <UserListItem key={user.username} user={user} />
        ))}
    </List>
  );
}

interface UserListItemProps {
    user: User;
}

function UserListItem({ user }: UserListItemProps) {
  return (
    <ListItem>
        <ListItemText primary={`Username: ${user.username}`} />
        <ListItemText primary={`Name: ${user.name}`} />
        <ListItemText primary={`Surname: ${user.surname}`} />
        <ListItemText primary={`Email: ${user.email}`} />
        <ListItemText primary={`Role: ${user.role}`} />
    </ListItem>
  );
}