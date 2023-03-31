import React, { useState, useEffect } from 'react';
import {Typography,TextField,Button,Grid,Box} from '@mui/material';
import allLanguages from '../../utils/Languages/allLanguages';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import { useNavigate } from "react-router-dom";
import Tenant from '../../types/Tenant';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Picker from '../../components/Picker/Picker';

export default function CreateTenantView() {
  const [tenantName, setTenantName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAdminName(tenantName);
  }, [tenantName]);

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
    toast.success('User created successfully');
  };

  return (
    <LayoutWrapper userType="superadmin">
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Create a new Tenant
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleCreateTenant} sx={{ mt: 2 }}>
          <TextField
            id="tenant-name"
            label="Tenant Name"
            value={tenantName}
            onChange={(event) => setTenantName(event.target.value)}
            variant="outlined"
            required 
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
          />
          <TextField
            id="admin-name"
            label="Admin Name"
            value={adminName}
            onChange={(event) => setAdminName(event.target.value)}
            variant="outlined"
            required
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
          />
          <Picker
            id="default-language"
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value)}
            choices={allLanguages}
          />
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTenant}
              fullWidth
              sx={{ mr: 2 }}
            >
              Create Tenant
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/SuperAdmin");
              }}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </LayoutWrapper>
  );
}
