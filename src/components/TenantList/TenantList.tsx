import { useState, useEffect } from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "./TenantListItem/TenantListItem";
import { Grid, Box, Typography } from "@mui/material";
import testdata from "./testData";

export default function TenantList() {
  const [tenants, setTenants] = useState<Tenant[] | undefined>();

  useEffect(() => {
    // Chiamata api per avere l'elenco di tenant dal DB
    setTenants(testdata);
  }, []);

  return (
    <Box padding={2}>
      <Typography variant="h4" marginBottom={2}>
        Tenant List
      </Typography>
      <Grid container spacing={2}>
        {tenants?.map((tenant: Tenant) => (
          <Grid item xs={12} key={tenant.id}>
            <Box width="100%" marginBottom={2}>
              <TenantListItem tenant={tenant} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
