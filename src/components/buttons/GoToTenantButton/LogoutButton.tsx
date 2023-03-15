import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';


export default function MyComponent() {
  const handleLogout = () => {
    // perform logout logic
    return <Navigate to="/login" />;
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
    </Button>
  );
}
