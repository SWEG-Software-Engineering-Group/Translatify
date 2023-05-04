import { useState } from 'react';
import { TextField, Grid, Snackbar } from '@mui/material';
import allLanguages from '../../utils/Languages/allLanguages';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Tenant from '../../types/Tenant';
import Picker from '../../components/Picker/Picker';
import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { grid } from "../../utils/MUI/gridValues";
import MuiAlert from '@mui/material/Alert';
import PageTitle from '../../components/PageTitle/PageTitle';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import { postData } from '../../services/axios/axiosFunctions';
import { useNavigate } from 'react-router-dom';

export default function CreateTenantView() {
  const [tenantName, setTenantName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(allLanguages[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCreateTenant = (event: { preventDefault: () => void; }) => {
    if(tenantName.trim() !== ''){
      event.preventDefault();
      setDisableSubmit(true);
      const newTenant: Tenant = {
        // id: Date.now(),
        // token: { name: "", idTenant: 0, privileges: [""], value: "" },
        tenantName: tenantName,
        defaultLanguage: selectedLanguage,
        creationDate: 1000 ,
        languages: [],
        admins: [],
        users: [],
        categories: [],
      };
      console.log(newTenant);
      postData(`${process.env.REACT_APP_API_KEY}/tenant/create`, newTenant)
      .then(res =>{
        setSnackbarOpen(true);      
        setTimeout(()=>{
          setDisableSubmit(false);
          navigate(-1);
        },1000)
      })
      .catch(err =>{
        setSnackbarErrorOpen(true);
        setDisableSubmit(false);
      })
    }
    else{
      alert('Tenant name must not be empty');
      setTenantName('');
    }
  };
  

  return (
    <PrivateRoute allowedUsers={['superadmin']}>
      <LayoutWrapper userType="superadmin">
        <Grid container spacing={grid.rowSpacing} direction="column">
          <Grid item xs={grid.fullWidth}>
          <PageTitle title='Tenant Creation Page'/>
          </Grid>
          <Grid item xs={grid.fullWidth}>
            <TextField
              id="tenant-name"
              label="Tenant Name"
              value={tenantName}
              onChange={(event) => setTenantName(event.target.value)}
              variant="outlined"
              required
              placeholder='Insert the tenant name'
              fullWidth
            />
          </Grid>
          <Grid item xs={grid.fullWidth}>
            <Picker
              id="Choose default language"
              value={selectedLanguage}
              onChange={(value) => setSelectedLanguage(value)}
              choices={allLanguages}
              onClear = {() => setSelectedLanguage(allLanguages[0])}
            />
          </Grid>
          <Grid item xs={grid.fullWidth}>
            <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
              <DiscardButton />
              <SubmitButton disabled={disableSubmit} handleSubmit={handleCreateTenant} value={'Create Tenant'}/>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
            <MuiAlert elevation={6} variant="filled" severity="success">
              Tenant created successfully
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