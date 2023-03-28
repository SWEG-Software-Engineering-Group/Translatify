import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userRole = user && user.attributes && user.attributes.role;
        // l'utente è già autenticato e ha un ruolo assegnato, reindirizza alla dashboard corretta
        switch (userRole) {
          case "admin":
            navigate("/Admin");
            break;
          case "content":
            navigate("/reviewTexts");
            break;
          case "superadmin":
            navigate("/SuperAdmin");
            break;
        }
        // salva il ruolo dell'utente in localStorage e il suo stato di autenticazione
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("isAuthenticated", "true");
      } catch (error) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(user.username, user.password);
      setIsLoading(false);
      setError("");
      // redirect to dashboard, here we will implement some logic, I guess
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
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
            label="Username"
            name="username"
            value={user.username}
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
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
}
