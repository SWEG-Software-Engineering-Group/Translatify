import { useState} from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "./TenantListItem/TenantListItem";
import { Grid, Box, Typography } from "@mui/material";

export default function TenantList() {
  const [tenants] = useState<Tenant[] | undefined>();

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
