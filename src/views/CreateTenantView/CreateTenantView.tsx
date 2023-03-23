import React, { useState } from 'react';
import {Typography,TextField,Button,Grid,Box, Container} from '@mui/material';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import allLanguages from '../../utils/Languages/allLanguages';

export default function CreateTenantView() {
  const [tenantName, setTenantName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Aggiungi qui il codice per salvare i dati del Tenant nel backend
  };

  return (
    <Container maxWidth="sm" >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Crea un nuovo Tenant
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleFormSubmit}>
          <Box sx={{ mt: 3 }}>
            <TextField
              id="tenant-name"
              label="Tenant Name"
              value={tenantName}
              onChange={(event) => setTenantName(event.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              id="admin-name"
              label="Admin Name"
              value={adminName}
              onChange={(event) => setAdminName(event.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <LanguagePicker
              id="language-select"
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value)}
              languages={allLanguages}
              />
            </Box>
            <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            sx={{ mt: 3, mb: 2 }}
            >
          Create Tenant
           </Button>
          </Box>
        </Grid>
      </Container>
  );
}