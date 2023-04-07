import Tenant from "../../types/Tenant";

const Tenantsettings : Tenant[] = [

    {
        id: 1,
        name: "tenant 1",
        admin: ["admin"],
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
            username: "pippo",
            password: "password",
            email: "email@email.it",
            role: "user",
            name: "utente name",
            surname: "pippo surname",
        }
        ],
        creationDate: new Date("2016-01-04 10:34:23"),
        token: {
        name: "token1",
        idTenant: 1,
        privileges: ["edit"],
        value: "1111",
        },
        languages: ["English", "Italian"],
        defaultLanguage: "Italian",
    },
    {
        id: 2,
        name: "tenant 2",
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
        languages: ["English", "Spanish"],
        defaultLanguage: "Spanish",
    },
];

export default Tenantsettings;
