import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../hooks/useAuth';

export default function LogoutButton() {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log("Error while signing out: ", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
    </Button>
  );
}
