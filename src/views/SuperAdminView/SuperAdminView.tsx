import { useState, useEffect } from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "../../components/TenantList/TenantListItem/TenantListItem";
import { Box } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Grid } from "@mui/material";
import { grid } from "../../utils/MUI/gridValues";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { getData } from "../../services/axios/axiosFunctions";

export default function SuperAdminView() {
  // HOOKS
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    getData(`${process.env.REACT_APP_API_KEY}/tenant/allTenants`)
    .then(res =>{
      setTenants(res.data.tenants);
      setFilteredTenants(res.data.tenants);
    })
    .catch(err =>{
    });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = tenants.filter((tenant) => {
      // cerca il tenant in base alla lingua
      if (tenant.languages.some((language) => language.toLowerCase().includes(query.toLowerCase()))) {
        return true;
      }

      // cerca il tenant in base all'ID (se la query è un numero)
      if (tenant.id === query) {
        return true;
      }

      // cerca il tenant in base al nome
      if (tenant.tenantName.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return false;
    });
    setFilteredTenants(filtered);
  };

  // UI
  return (
        <PrivateRoute allowedUsers={['superadmin']}>
          <LayoutWrapper userType="superadmin">
            <Grid
              container
              spacing={1}
              direction="column"
            >
            <Grid item xs={grid.fullWidth} textAlign={"center"}>
              <PageTitle title='SuperAdmin Dashboard'/>
            </Grid>
            <Box sx={{ p: 3 }}>
              <SearchBox handleParentSearch={handleSearch} />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredTenants.length ? (
                  filteredTenants.map((tenant) => (
                  <Grid item xs={12} key={tenant.id}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12}>
                        <TenantListItem tenant={tenant} />
                      </Grid>
                  </Grid>
              </Grid>
          ))
            ) : (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                <p>No tenants found</p>
              </Grid>
            )}
            </Grid>
          </Box>
                </Grid>
              </LayoutWrapper>
        </PrivateRoute>
  );
}
