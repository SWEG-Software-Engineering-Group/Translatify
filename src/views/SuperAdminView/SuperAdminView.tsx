import {useState, useEffect} from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "../../components/TenantList/TenantListItem/TenantListItem";
import SearchBox from "../../components/SearchBox/SearchBox";
import GoToTenantButton from "../../components/buttons/GoToTenantButton/GoToTenantButton";
import { Container, Grid } from "@mui/material";

export default function SuperAdminView() {
    //HOOKS
    const [tenants, setTenants] = useState<Tenant[] | undefined>();
    const [filteredTenants, setFilteredTenants] = useState<Tenant[] | undefined>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    useEffect(() => {
      //chiamata api per avere l'elenco di tenant dal DB (al momento prende i dati di cui sotto)
      setTenants(tenantsArrayForTesting);
    }, []);
  
    useEffect(() => { // ogni volta che cambia la query di ricerca, filtra i tenant
      if (tenants) {
        setFilteredTenants(() => tenants.filter((tenant) => tenant.name?.toLowerCase().includes(searchQuery.toLowerCase())));
      }
    }, [searchQuery, tenants]);
  
    //LOGIC

    //dummy data for testing
    let tenantsArrayForTesting: Tenant[] = [
      {
        id: 1,
        name: "tenant1",
        admin: ["admin"],
        users: [
          {
            username: "admin",
            password: "password",
            email: "email@email.it",
            role: "admin",
            name: "admin name",
            surname: "admin surname",
          },
        ],
        creationDate: new Date("2016-01-04 10:34:23"),
        token: {
          name: "token1",
          idTenant: 1,
          privileges: ["edit"],
          value: "1111",
        },
        languages: ["English", "Italian"],
        defaultLanguage: "English",
      },
      {
        id: 2,
        name: "tenant2",
        admin: ["admin"],
        users: [
          {
            username: "admin",
            password: "password",
            email: "email@email.it",
            role: "admin",
            name: "admin name",
            surname: "admin surname",
          },
        ],
        creationDate: new Date("2016-01-04 10:34:23"),
        token: {
          name: "token1",
          idTenant: 1,
          privileges: ["edit"],
          value: "1111",
        },
        languages: ["English", "Italian"],
        defaultLanguage: "English",
      },
    ];
  
    //UI

    return (
        <Container maxWidth="lg"> 
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </Grid>
            <Grid item xs={12}>
              {filteredTenants?.map((tenant) => (
                <><TenantListItem key={tenant.id} name={tenant.name} id={0} admin={tenant.admin} users={tenant.users} creationDate={tenant.creationDate} token={tenant.token} languages={tenant.languages} defaultLanguage={tenant.defaultLanguage} /><GoToTenantButton key={tenant.id} tenant={tenant} /></>
                ))}
            </Grid>
          </Grid>
        </Container>
      );
}