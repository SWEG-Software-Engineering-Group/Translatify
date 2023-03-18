import { useState, useEffect, SetStateAction } from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "../../components/TenantList/TenantListItem/TenantListItem";
import SearchBox from "../../components/SearchBox/SearchBox";
import GoToTenantButton from "../../components/buttons/GoToTenantButton/GoToTenantButton";
import { Container, Grid } from "@mui/material";
import tenantdata from "../SuperAdminView/testData";

export default function SuperAdminView() {
  // HOOKS
  const [tenants, setTenants] = useState<Tenant[] | undefined>();
  const [filteredTenants, setFilteredTenants] = useState<Tenant[] | undefined>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    // chiamata api per avere l'elenco di tenant dal DB (al momento prende i dati di cui sotto)
    setTenants(tenantdata);
  }, []);

  useEffect(() => {
    if (tenants) {
      // Filtriamo i Tenant sulla base della stringa di ricerca inserita dall'utente (prendendo il risultato)
      const filtered = tenants.filter((tenant) =>
        tenant.name.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredTenants(filtered);
    }
  }, [tenants, searchString]);

  // UI
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBox onChange={(value: SetStateAction<string>) => setSearchString(value)} />
        </Grid>
        <Grid item xs={12}>
          {filteredTenants?.map((tenant) => (
            <div key={tenant.id}>
              <TenantListItem tenant={tenant}/>
              <GoToTenantButton tenant={tenant} />
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
