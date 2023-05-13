import React, { useState } from "react";
import { Button,TextField,Box,Paper, Stack, Snackbar } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import PageTitle from "../../components/PageTitle/PageTitle";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";

export default function LoginView() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      event.preventDefault();
      const result = await auth.signIn(user.email, user.password);
      if (result.success) {
        navigate({ pathname: `/` });
      } else {
        setOpenSnackbar(true);
        setErrorMessage(result.message);
      }
  };
  
  return (
    auth?.isAuthenticated ? 
      <Navigate to='/' />
      :
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, minWidth: 300 }}>
        <PageTitle title='Login'/>
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
          <Stack direction="row" spacing={2}>
            <SubmitButton handleSubmit={handleSubmit} value="Login" />
            <Button
              component={Link}
              to="/forgotPassword"
              variant="text"
              color="primary"
            >
              Forgot your password?
            </Button>
          </Stack>
        </form>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage}
        action={
          <Button color="secondary" size="small" onClick={() => setOpenSnackbar(false)}>
            Close
          </Button>
        }
      />
      </Paper>
    </Box>    
    
  );
}
