import React, { useState } from "react";
import {Button,Container,TextField,Grid,Typography} from "@mui/material";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import User from "../../types/User";
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';

export default function CreateUserView() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    surname: "",
  });

  const handleCreateUser = async () => {
    const password = uuidv4();
    const cognito = new CognitoIdentityServiceProvider();
    const params = {
      UserPoolId: "your-pool-user-id",
      Username: user.username,
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
      // insert here the code to send success message
    } catch (err) {
      // insert here the code to send error message
    }
  };

  return (
    <LayoutWrapper userType="superadmin">
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Creation
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Surname"
              value={user.surname}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
        >
          Create User
        </Button>
      </form>
    </Container>
  </LayoutWrapper>
  );
}
