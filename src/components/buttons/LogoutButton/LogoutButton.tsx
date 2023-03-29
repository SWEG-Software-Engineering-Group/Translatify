import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Auth } from "aws-amplify";
import {useNavigate} from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log("Error in signing out: ", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
    </Button>
  );
}
