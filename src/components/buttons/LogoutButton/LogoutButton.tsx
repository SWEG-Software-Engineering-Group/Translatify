import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Auth } from "aws-amplify";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      return <Navigate to="/login" />;
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
