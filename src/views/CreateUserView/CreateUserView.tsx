import React, { useState } from "react";
import {TextField,Grid,Typography} from "@mui/material";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import User from "../../types/User";
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { grid } from "../../utils/MUI/gridValues";

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
        padding={2}
        margin={2}
        textAlign={"center"}
        style={{ minHeight: "100vh" }}
      >
      <Typography variant="h5" gutterBottom>
        User Creation Page
      </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              placeholder="Insert the name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Surname"
              placeholder="Insert the surname"
              value={user.surname}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Username"
              placeholder="Insert the username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Role"
              placeholder="Insert the role"
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
              placeholder="Insert the email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid sx={{width: "100%", marginTop: "1rem"}}>
        <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
          <DiscardButton goTo={'/SuperAdmin'} />
          <SubmitButton handleSubmit={handleCreateUser} value={'Create User'}/>
        </Grid>
      </Grid>
    </Grid>
  </LayoutWrapper>
  );
}
