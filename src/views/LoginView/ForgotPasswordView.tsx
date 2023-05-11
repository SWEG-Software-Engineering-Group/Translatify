import React, { useState } from "react";
import { TextField, Box, Paper, Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";
import { Snackbar } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    axios.get(`${process.env.REACT_APP_API_KEY}/user/${email}/getResetCode`, {headers:{'Content-Type': 'application/json', Accept: 'application/json'}})
    .then(res=>{
      navigate(`/resetPassword/${email}`)
      setIsLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setSnackbarMessage("Your email may be not verified: try again or contact technical support.");
      setSnackbarOpen(true);
      setIsLoading(false);
    })
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
      <Paper sx={{ p: 4, minWidth: 500 }}>
        <PageTitle title='Password Recovery'/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Insert your email here"
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Grid container direction={'row'} justifyContent={"space-between"} gap={grid.columnSpacing}>
            <DiscardButton></DiscardButton>
            <SubmitButton handleSubmit={handleSubmit} value={isLoading ? "Loading..." : "Send Recovery Code"} disabled={isLoading ? true : false} />
            <Snackbar
              open={snackbarOpen}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
              autoHideDuration={3000}
            />
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}