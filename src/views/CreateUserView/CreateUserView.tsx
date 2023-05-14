import { useState } from "react";
import {TextField, Grid, Snackbar} from "@mui/material";
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
import generateRandomPassword from "../../utils/PasswordGenerator/PasswordGenerator";

export default function CreateUserView() {
  const auth = useAuth();

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
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const {tenantId} = useParams<{ tenantId: string }>();

  if(auth.tenant?.id && auth.tenant?.id !== tenantId) return <Navigate to={'/accessDenied'}/>;

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(user.email.trim() === '' || user.surname.trim() === '' || user.name.trim() ==='' || user.group.trim() === ''){
      setSnackbarErrorMessage("Please fill in all form fields");
      setSnackbarErrorOpen(true);
    }
    else{
      setDisableSubmit(true);
        if((auth.tenant.id && auth.tenant.id === tenantId) || !auth.tenant.id){ //for security, if an admin is logged in and tries to create a user for another tenant he can't
          postData(`${process.env.REACT_APP_API_KEY}/user/create/${tenantId}`,
          {
            "Email": user.email.trim(),
            "Password": generateRandomPassword(),
            "Name": user.name.trim(),
            "Surname": user.surname.trim(),
            "Group": user.group.trim(),
          })
          .then(res=>{
            setSnackbarMessage("User added to tenant");
            setSnackbarOpen(true);
            setTimeout(() => {
              setDisableSubmit(false);
              navigate(-1);
            },1000);       
          })
          .catch(err=>{
            if(err.response.data.Error['Create User:'].message)
              setSnackbarErrorMessage(err.response.data.Error['Create User:'].message);
            else
              setSnackbarErrorMessage('Something went wrong, try again later');
            setSnackbarErrorOpen(true);
            setDisableSubmit(false);
          });
        }
        else{
          setSnackbarErrorOpen(true);
          setDisableSubmit(false);
        }
    }
  };


  return (auth.user?.group === 'superadmin' && !tenantId)  //Checks if a superadmin is trying to access the URL directly without selecting a tenantId
  ? 
  <Navigate to={'/SuperAdmin'}/>
  :
  (
    <PrivateRoute allowedUsers={['admin', 'superadmin']}>
      <LayoutWrapper userType={auth.user?.group}>
        <Grid
          container
          spacing={grid.rowSpacing}
          direction="column"
        >
          <Grid item xs={grid.fullWidth} textAlign={"center"}>
            <PageTitle title='Create a new user'/>
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
              id={'Choose user role'}
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
              <SubmitButton disabled={disableSubmit} handleSubmit={handleSubmit} value={"Submit"} />
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={() => setSnackbarErrorOpen(false)}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarErrorOpen(false)}>
            {snackbarErrorMessage}
          </MuiAlert>
        </Snackbar>
      </LayoutWrapper>
    </PrivateRoute>
  );
}