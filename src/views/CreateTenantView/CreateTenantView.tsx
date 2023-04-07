import { useState } from 'react';
import {Typography,TextField,Grid} from '@mui/material';
import allLanguages from '../../utils/Languages/allLanguages';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Tenant from '../../types/Tenant';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Picker from '../../components/Picker/Picker';

import DiscardButton from "../../components/buttons/DiscardButton/DiscardButton";
import SubmitButton from "../../components/buttons/SubmitButton/SubmitButton";
import { grid } from "../../utils/MUI/gridValues";

export default function CreateTenantView() {
  const [tenantName, setTenantName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(allLanguages[0]);

  const handleCreateTenant = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const newTenant: Tenant = {
      id: Date.now(),
      name: tenantName,
      admin: [adminName],
      users: [],
      creationDate: new Date(),
      token: { name: "", idTenant: 0, privileges: [""], value: "" }, languages: [],
      defaultLanguage: selectedLanguage
    };
    console.log(newTenant);
    // here will be added the code to send the data to the backend
    toast.success('Tenant created successfully');
  };

  return (
    <LayoutWrapper userType="superadmin">
    <Grid
      container
      spacing={grid.rowSpacing}
      direction="column"
    >
      <Grid item xs={grid.fullWidth}>
          <Typography variant="h5" textAlign={'center'}>
            Tenant Creation Page
          </Typography>
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
      <Grid item>
        <Grid container direction={'row'} wrap='nowrap' columnSpacing={grid.columnSpacing}>
          <Grid item xs={grid.fullWidth}>
            <TextField
              id="admin-name"
              label="Admin Name"
              value={adminName}
              onChange={(event) => setAdminName(event.target.value)}
              variant="outlined"
              required
              placeholder='Insert the admin name'
              fullWidth
            />
          </Grid>
          <Grid item xs={grid.fullWidth}>
            <TextField
            required
            id="adminSuffix"
            variant="outlined"
            label="Admin suffix - read only"
            InputProps={{
                readOnly: true,
            }}
            value={tenantName}
            fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={grid.fullWidth}>
          <Picker
            id="default-language"
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value)}
            choices={allLanguages}
          />
      </Grid>
      <Grid item xs={grid.fullWidth}>
        <Grid container justifyContent={'space-between'} gap={grid.columnSpacing}>
          <DiscardButton />
          <SubmitButton handleSubmit={handleCreateTenant} value={'Create Tenant'}/>
        </Grid>
      </Grid>
    </Grid>
  </LayoutWrapper>
  );
}
