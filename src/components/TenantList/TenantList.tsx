import {useState, useEffect} from "react";
import Tenant from "../../types/Tenant";
import TenantListItem from "./TenantListItem/TenantListItem";

export default function TenantList() {
    //HOOKS
    const [tenants, setTenants] = useState<Tenant[] | undefined>();
    const [tenantListItems, setTenantListItems] = useState<any[]>([]);
        
    useEffect(() => {
        //chiamata api per avere l'elenco di tenant dal DB
            setTenants(tenantsArrayForTesting);
    },[]);
    
    useEffect(()=>{
        if (tenants) {
            const newTenantListItems = tenants.map((tenant : Tenant) => (
                <TenantListItem tenant={tenant} />
            ));
            setTenantListItems(() => newTenantListItems);
        }
    }, [tenants]);
    
    //LOGIC

    let tenantsArrayForTesting : Tenant[] = [{
        id: 1,
        name: 'tenant1',
        admin: ['admin'],
        users: [{username: 'admin',
            password: 'password',
            email: 'email@email.it',
            role: 'admin',
            name: 'admin name',
            surname: 'admin surname',}],
        creationDate: new Date("2016-01-04 10:34:23"),
        token: {
            name: 'token1',
            idTenant: 1,
            privileges: ['edit'],
            value: '1111',
        },
        languages: ['English', 'Italian'],
        defaultLanguage: 'English',
    },
    {
        id: 2,
        name: 'tenant2',
        admin: ['admin'],
        users: [{username: 'admin',
            password: 'password',
            email: 'email@email.it',
            role: 'admin',
            name: 'admin name',
            surname: 'admin surname',}],
        creationDate: new Date("2016-01-04 10:34:23"),
        token: {
            name: 'token1',
            idTenant: 1,
            privileges: ['edit'],
            value: '1111',
        },
        languages: ['English', 'Italian'],
        defaultLanguage: 'English',
    }];

    
  //UI
    return(
    <div>
        {tenants && tenantListItems}
    </div>
    )
};