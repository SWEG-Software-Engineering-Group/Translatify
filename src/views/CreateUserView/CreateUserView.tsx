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
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const {tenantId} = useParams<{ tenantId: string }>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postData(`${process.env.REACT_APP_API_KEY}/user/createUser`,
    {
      "email": user.email,
      "password": uuidv4(),
      "name": user.name,
      "surname": user.surname,
      "group": user.group,
    }
    )
    .then(res => {
      console.log(res, 'yay');
      // //need createUser to return userId
      // //if tenantId contains something, use that one, else use tenant.id from useAuth (this is for handling direct user cretion from an Admin in the first case, and in the other from a SuperAdmin)
      // postData(`${process.env.REACT_APP_API_KEY}/tenant/${res.data.id}/addUser`, {})
      // .then(res=>{
      // })
      // .catch(err=>{

      // });
    })
    .catch(err => {
      console.log("NOOO");
    });
  };
  console.log(tenantId);
  return (auth.user.group === 'superadmin' && !tenantId) ? <Navigate to={'/SuperAdmin'}/> :
(
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