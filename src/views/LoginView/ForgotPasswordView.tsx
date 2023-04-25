import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { TextField, Box, Paper, Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";
import { Snackbar } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.forgotPassword(email);
      setIsLoading(false);
      setSnackbarMessage("Password recovery email sent successfully.");
      setSnackbarOpen(true);
    } catch (error: any) {
      setIsLoading(false);
      setSnackbarMessage("Error: " + error.message);
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
            label="Insert your email address"
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
            <SubmitButton handleSubmit={handleSubmit} value={isLoading ? "Loading..." : "Send Password Recovery Email"} />
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
