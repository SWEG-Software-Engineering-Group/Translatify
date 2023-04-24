import { useState } from "react";
import {TextField, Grid, Snackbar} from "@mui/material";
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
import Picker from "../../components/Picker/Picker";
import { useAuth } from "../../hooks/useAuth";
import { postData } from "../../services/axios/axiosFunctions";
import { useParams } from "react-router-dom";

export default function CreateUserView() {
  const auth = useAuth();

  const cognito = new CognitoIdentityServiceProvider();

  const initialUserState: User = {
    username: "",
    password: "",
    email: "",
    group: "user",
    name: "",
    surname: "",
    };
  
  const [user, setUser] = useState<User>(initialUserState);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const tenantIdFromURL = useParams<{ tenantId: string }>();
  const {tenant} = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postData(`${process.env.REACT_APP_API_KEY}/user/createUser`, user
    // {
    //   "email": user.email,
    //   "password": uuidv4(),
    //   "name": user.name,
    //   "surname": user.surname,
    //   "group": user.group,
    // }
    )
    .then(res => {
      console.log(res, 'yay');
      //need createUser to return userId
      //if tenantIdFromURL contains something, use that one, else use tenant from useAuth (this is for handling direct user cretion from an Admin in the first case, and in the other from a SuperAdmin)
      postData(`${process.env.REACT_APP_API_KEY}/tenant/${res.data.id}/addUser`, {})
      .then(res=>{
      })
      .catch(err=>{

      });
    })
    .catch(err => {
      console.log("NOOO");
    });

  const password = uuidv4(); //random password by the system for safety purposes

  //Retrieve the user groups in which he belongs to (to find Tenant name and fill the field inside the user)
  const groupsResponse = await cognito.adminListGroupsForUser({
    UserPoolId: "your-pool-user-id",
    Username: user.username,
  }).promise();

  // Search for Tenant inside the groups
  let tenantName = "";
  const groups = groupsResponse.Groups || [];
  for (const group of groups) {
    if (group.GroupName?.startsWith("Tenant-")) {
      tenantName = group.GroupName.substring("Tenant-".length);
      break;
    }
  }

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
        Name: "surname",
        Value: user.surname,
      },
      {
        Name: "email",
        Value: user.email,
      },
      {
        Name: "custom:group",
        Value: user.group,
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
  <PrivateRoute allowedUsers={['admin', 'superadmin']}>
    <LayoutWrapper userType={auth.user.group}>
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
        {/* <Grid item xs={grid.fullWidth}>
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
        </Grid> */}
        <Grid item xs={grid.fullWidth}>
          <Picker 
            id={'Role'}
            value={user.group}
            onChange={(group : string) => setUser({ ...user, group})}
            choices={['user', 'admin']}
            onClear = {() => setUser({ ...user, group: 'user'})}
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
        {/* <Grid item xs={grid.fullWidth}>
          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            placeholder="Insert the password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Grid> */}
        <Grid item xs={grid.fullWidth}>
          <Grid container justifyContent={"space-between"} gap={grid.columnSpacing}>
            <DiscardButton />
            <SubmitButton handleSubmit={handleSubmit} value={"Submit"} />
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