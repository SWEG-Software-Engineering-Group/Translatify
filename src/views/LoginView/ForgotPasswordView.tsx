import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Button, TextField, Typography, Box, Paper, Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import { grid } from "../../utils/MUI/gridValues";

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.forgotPassword(email);
      setIsLoading(false);
      setError("");
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
      <Paper sx={{ p: 4, minWidth: 500 }}>
        <PageTitle title='Password Recovery'/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="email"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send Password Recovery Email"}
            </Button>
          </Grid>
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
