import Tenant from "../../types/Tenant";

const Tenantsettings : Tenant = {

    
        id: 1,
        tenantName: "tenant 1",
        admins: ["admin"],
        users: [
            {
                username: "admin",
                password: "password",
                email: "email@email.it",
                role: "admin",
                name: "admin name ",
                surname: "admin surname",
            },
            {
                username: "admin2",
                password: "password123",
                email: "email2@email.it",
                role: "admin",
                name: "admin 2 name ",
                surname: "admin 2  surname",
            },
        {
            username: "pippo",
            password: "password",
            email: "email@email.it",
            role: "user",
            name: "utente name",
            surname: "pippo surname",
        },
        {
            username: "utente di prova",
            password: "password",
            email: "email@email.it",
            role: "user",
            name: "utente name",
            surname: "pippo surname",
        }
        ],
        creationDate: new Date("2023-02-03 10:34:23"),
        token: {
        name: "token1",
        idTenant: 1,
        privileges: ["edit"],
        value: "1111",
        },
        languages: ["English", "Italian"],
        defaultLanguage: "Spanish",
    

    };

export default Tenantsettings;
