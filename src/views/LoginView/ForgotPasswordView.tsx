import React, { useState } from "react";
import { TextField, Box, Paper, Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";
import { Snackbar } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { postData, getData } from "../../services/axios/axiosFunctions";

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [resetResponse, setResetResponse] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resetResponse = await postData(`${process.env.REACT_APP_API_KEY}/user/resetPassword`, { username });
      console.log(resetResponse);

      setResetResponse(resetResponse.data.message);

      const resetCodeResponse = await getData(`${process.env.REACT_APP_API_KEY}/user/${username}/getResetCode`);

      setIsLoading(false);
      if (resetCodeResponse.data.Error) {
        setSnackbarMessage(resetCodeResponse.data.Error["Send reset code"].message);
        console.log(resetCodeResponse.data.Error["Send reset code"].message);
      } else {
        setSnackbarMessage(resetCodeResponse.data.message);
      }
      setSnackbarOpen(true);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.Error) {
        setSnackbarMessage(error.response.data.Error["Send reset code"].message);
        
      } else {
        setSnackbarMessage("Your email may be not verified: try again or contact technical support.");
      }
      setSnackbarOpen(true);
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
      <Paper sx={{ p: 4, minWidth: 500 }}>
        <PageTitle title='Password Recovery'/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Insert your username here"
            name="username"
            type="email"
            value={username}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          {resetResponse && (
            <Box sx={{ mb: 2 }}>
              <p>{resetResponse}</p>
            </Box>
          )}
          <Grid container direction={'row'} justifyContent={"space-between"} gap={grid.columnSpacing}>
            <DiscardButton></DiscardButton>
            <SubmitButton handleSubmit={handleSubmit} value={isLoading ? "Loading..." : "Send Recovery Code"} />
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