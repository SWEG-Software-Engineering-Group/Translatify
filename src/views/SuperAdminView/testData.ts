import Tenant from "../../types/Tenant";

const tenantsArrayForTesting: Tenant[] = [
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

export default tenantsArrayForTesting;
