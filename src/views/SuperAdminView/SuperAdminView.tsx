import { useState, useEffect } from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "../../components/TenantList/TenantListItem/TenantListItem";
import GoToTenantButton from "../../components/buttons/GoToTenantButton/GoToTenantButton";
import { Box } from "@mui/material";
import tenantdata from "../SuperAdminView/testData";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import TextSearch from "../../components/TextSearch/TextSearch";

export default function SuperAdminView() {
  // HOOKS
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    setTenants(tenantdata);
    setFilteredTenants(tenantdata);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = tenants.filter((tenant) => {
      // cerca il tenant in base alla lingua
      if (tenant.languages.some((language) => language.toLowerCase().includes(query.toLowerCase()))) {
        return true;
      }

      // cerca il tenant in base all'ID (se la query è un numero)
      if (!isNaN(Number(query)) && tenant.id === Number(query)) {
        return true;
      }

      // cerca il tenant in base al nome
      if (tenant.name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return false;
    });
    setFilteredTenants(filtered);
  };

  // UI
  return (
    <LayoutWrapper userType="superadmin">
      <Box sx={{ p: 3 }}>
        <TextSearch handleParentSearch={handleSearch} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {filteredTenants.length ? (
            filteredTenants.map((tenant) => (
              <Box sx={{ display: "flex", flexDirection: "row", my: 1 }} key={tenant.id}>
                <TenantListItem tenant={tenant} />
                <GoToTenantButton tenant={tenant} />
              </Box>
            ))
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
              <p>No tenants found</p>
            </Box>
          )}
        </Box>
      </Box>
    </LayoutWrapper>
  );
}
