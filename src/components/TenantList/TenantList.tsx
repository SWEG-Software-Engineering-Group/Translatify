import { useState } from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "./TenantListItem/TenantListItem";
import { Grid, Box, Typography } from "@mui/material";

type TenantListProps = {
  tenants?: Tenant[];
};

export default function TenantList({ tenants }: TenantListProps) {
  const [tenantsState] = useState<Tenant[] | undefined>(tenants);

  return (
    <Box padding={2} data-testid="tenant-list">
      <Typography variant="h4" marginBottom={2}>
        Tenant List
      </Typography>
      <Grid container spacing={2}>
        {tenantsState?.map((tenant: Tenant) => (
          <Grid item xs={12} key={tenant.id}>
            <Box width="100%" marginBottom={2}>
              <TenantListItem tenant={tenant} data-testid="tenant-list-item" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}