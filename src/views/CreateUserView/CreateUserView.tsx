import React, { useState } from "react";
import {TextField, Grid, Typography, Snackbar} from "@mui/material";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import User from "../../types/User";
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { grid } from "../../utils/MUI/gridValues";
import MuiAlert from '@mui/material/Alert';
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

export default function CreateUserView() {
  const initialUserState: User = {
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    surname: "",
    };
  const [user, setUser] = useState<User>(initialUserState);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const tenantName : string = 'test'

  const handleCreateUser = async () => {
  const password = uuidv4();
  const cognito = new CognitoIdentityServiceProvider();
  const params = {
      UserPoolId: "your-pool-user-id",
      Username: user.username + tenantName,
      TemporaryPassword: password,
      UserAttributes: [
      {
        Name: "name",
        Value: user.name,
      },
      {
        Name: "family_name",
        Value: user.surname,
      },
      {
        Name: "email",
        Value: user.email,
      },
      {
        Name: "custom:role",
        Value: user.role,
      },
    ],
  };
  
  try {
    await cognito.adminCreateUser(params).promise();
    setSnackbarOpen(true);
    setSnackbarMessage('User created successfully');
    handleResetForm();
  } catch (err: String | any) {
    setSnackbarOpen(true);
    setSnackbarMessage(err.message);
  }
};

  const handleResetForm = () => {
    setUser(initialUserState);
  }

return (
    <PrivateRoute allowedUsers={['admin']}>
      <LayoutWrapper userType='admin'>
      <Grid
        container
        spacing={grid.rowSpacing}
        direction="column"
      >
        <Grid item xs={grid.fullWidth} textAlign={"center"}>
          <PageTitle title='User Creation Page'/>
        </Grid>
        <Grid item xs={grid.fullWidth} sm={grid.halfWidth}>
          <TextField
          required
          fullWidth
          label="Name"
          placeholder="Insert the name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={grid.fullWidth} sm={grid.halfWidth}>
          <TextField
          required
          fullWidth
          label="Surname"
          placeholder="Insert the surname"
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
          />
        </Grid>
        <Grid item xs={grid.fullWidth}>
          <Grid container columnSpacing={grid.columnSpacing}>
            <Grid item xs={grid.halfWidth}>
              <TextField
              required
              fullWidth
              label="Username"
              placeholder="Insert the username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={grid.halfWidth}>
              <TextField
              disabled
              fullWidth
              label="Tenant name"
              value={tenantName}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={grid.fullWidth}>
          <TextField
          required
          fullWidth
          label="Role"
          placeholder="Insert the role"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
        </Grid>
        <Grid item xs={grid.fullWidth}>
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            placeholder="Insert the email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={grid.fullWidth}>
          <Grid container justifyContent={"space-between"} gap={grid.columnSpacing}>
            <DiscardButton />
            <SubmitButton handleSubmit={handleCreateUser} value={"Submit"} />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
      <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
        {snackbarMessage}
      </MuiAlert>
        </Snackbar>
        </LayoutWrapper>
    </PrivateRoute>
);
}