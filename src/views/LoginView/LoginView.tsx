import React, { useState } from "react";
import { Button,TextField,Typography,Box,Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../Hooks/useAuth'

export default function LoginView() {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // event.preventDefault();
    // setIsLoading(true);
    // try {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(user.email)) {
    //     throw new Error("Invalid email address");
    //   }
    //   if (!user.password) {
    //     throw new Error("Password is required");
    //   }
    //   await Auth.signIn(user.email, user.password);
    //   const authenticatedUser = await Auth.currentAuthenticatedUser();
    //   const userRole = authenticatedUser && authenticatedUser.attributes && authenticatedUser.attributes.role;
    //   switch (userRole) {
    //     case "admin":
    //       navigate("/Admin");
    //       break;
    //     case "content":
    //       navigate("/User");
    //       break;
    //     case "superadmin":
    //       navigate("/SuperAdmin");
    //       break;
    //     default:
    //       throw new Error("User role not found");
    //   }
    //   localStorage.setItem("userRole", userRole);
    //   localStorage.setItem("isAuthenticated", "true");
    //   setIsLoading(false);
    //   setError("");
    // } catch (error: any) {
    //   setIsLoading(false);
    //   setError(error.message);
    // }
      event.preventDefault();
      const result = await auth.signIn(user.email, user.password);
      if (result.success) {
          navigate({ pathname: "/admin" });
      } else {
          alert(result.message);
      }
  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, minWidth: 300 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/forgotPassword"
            variant="text"
            color="primary"
            sx={{ mt: 2 }}
          >
            Forgot your password?
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
