import React, { useState } from "react";
import {Button,TextField,Grid,Typography} from "@mui/material";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import User from "../../types/User";
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

export default function CreateUserView() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    surname: "",
  });

  const navigate = useNavigate();

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
      toast.success('User created successfully');
    } catch (err: String | any) {
      toast.error(err.message);
    }
  };

  return (
    <LayoutWrapper userType="superadmin">
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding={2}
        margin={2}
        textAlign={"center"}
        style={{ minHeight: "100vh" }}
      >
      <Typography variant="h5" gutterBottom>
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
          fullWidth
          sx={{ mt: 2 }}
        >
          Create User
        </Button>
        <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("/SuperAdmin");
        }}
        fullWidth
        sx={{ mt: 2, mr: 2 }}
      >
        Cancel
      </Button>
      </form>
    </Grid>
  </LayoutWrapper>
  );
}
