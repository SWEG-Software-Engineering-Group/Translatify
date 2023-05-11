import React, { useState } from "react";
import { Button,TextField,Box,Paper, Stack, Snackbar } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {useAuth} from '../../hooks/useAuth'
import PageTitle from "../../components/PageTitle/PageTitle";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import axios from "axios";

export default function ResetPasswordView() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);  
  const navigate = useNavigate();
  const {email} = useParams<{email : string}>();

  const [state, setState] = useState({    
    code: "",
    password: "",
    repeatPassword: "",
  });
  
  React.useEffect(() => {
    if (!email) {
      navigate(-1);
    }
  }, [email, navigate]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if(email){
        axios.post(`${process.env.REACT_APP_API_KEY}/user/resetPassword`, { Username: email, Code:state.code, Password:state.password }, {headers:{'Content-Type': 'application/json', Accept: 'application/json'}})
        .then(async (res) =>  {
          const result = await auth.signIn(email, state.password);
          if (result.success) {
            navigate({ pathname: `/` });
          } else {
            throw new Error('Sign in failed, try again later');
          }          
        })
        .catch(err=>{
          console.log(err);
          setOpenSnackbar(true);
          setErrorMessage(err.message);
        })
      }
  };
  
  return (
    auth.isAuthenticated ? 
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
        <PageTitle title='Reset password'/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Code"
            name="code"
            value={state.code}
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
            value={state.password}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="New password"
            type="password"
            name="repeatPassword"
            value={state.repeatPassword}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <SubmitButton handleSubmit={handleSubmit} value="Reset password and login" />
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
