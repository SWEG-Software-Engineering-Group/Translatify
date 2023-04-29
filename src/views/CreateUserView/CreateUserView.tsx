import { useState } from "react";
import {TextField, Grid, Snackbar} from "@mui/material";
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
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const {tenantId} = useParams<{ tenantId: string }>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(user.email.trim() === '' || user.surname.trim() === '' || user.name.trim() ==='' || user.group.trim() === ''){
      alert('Please fill in all form fields');      
    }
    else{
      setDisableSubmit(true);
      postData(`${process.env.REACT_APP_API_KEY}/user/create/${tenantId}`,
      {
        "email": user.email.trim(),
        "password": uuidv4(),
        "name": user.name.trim(),
        "surname": user.surname.trim(),
        "group": user.group.trim(),
      }
      )
      .then(res => {
        // //need createUser to return userId
        // //if tenantId contains something, use that one, else use tenant.id from useAuth (this is for handling direct user cretion from an Admin in the first case, and in the other from a SuperAdmin)
        // if(auth.tenant.id && (auth.tenant.id === tenantId || !tenantId)){   //addUser for admin
        //   console.log('àaaaaaaaaaaaa');
        //   postData(`${process.env.REACT_APP_API_KEY}/user/create/${auth.tenant.id}`, {})
        //   .then(res=>{
        //     setSnackbarMessage("User added to tenant");
        //     setSnackbarOpen(true);
        //     setTimeout(() => {
        //       setDisableSubmit(false);
        //       navigate(-1);
        //     },3000);       
        //   })
        //   .catch(err=>{
        //     throw(err);
        //   });
        // }
        // else if (tenantId && !auth.tenant.id){  //addUser for superadmin
        // console.log(tenantId);
        //   postData(`${process.env.REACT_APP_API_KEY}/user/create/${tenantId}`, {})
        //   .then(res=>{
            setSnackbarMessage(`User added to tenant ${tenantId}`);
            setSnackbarOpen(true);
          // })
          // .catch(err=>{
          //   throw(err);
          // });
        // }

      })
      .catch(err => {
        setSnackbarErrorOpen(true);
        setDisableSubmit(false);
        console.log(err);
      });
    }
  };


  return (auth.user.group === 'superadmin' && !tenantId)  //Checks if a superadmin is trying to access the URL directly without selecting a tenantId
  ? 
  <Navigate to={'/SuperAdmin'}/>
  :
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
            Something went wrong, try again later
          </MuiAlert>
        </Snackbar>
      </LayoutWrapper>
    </PrivateRoute>
  );
}