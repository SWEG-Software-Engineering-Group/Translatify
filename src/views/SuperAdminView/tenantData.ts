import Tenant from "../../types/Tenant";

const tenantsArrayForTesting: Tenant[] = [
  {
    id: 1,
    tenantName: "Acme Inc.",
    admins: ["asmith"],
    users: ['id1', 'id2', 'id3'
      // {
      //   username: "jdoe",
      //   password: "password",
      //   email: "johndoe@acme.com",
      //   role: "user",
      //   name: "John",
      //   surname: "Doe",
      // },
      // {
      //   username: "asmith",
      //   password: "password",
      //   email: "alicesmith@acme.com",
      //   role: "admin",
      //   name: "Alice",
      //   surname: "Smith",
      // },
    ],
    creationDate: new Date("2022-01-01T00:00:00"),
    token: {
      name: "acme-token",
      idTenant: 1,
      privileges: ["read"],
      value: "abcdefg",
    },
    languages: ["English", "Spanish", "French"],
    defaultLanguage: "English",
  },
  {
    id: 2,
    tenantName: "XYZ Corporation",
    admins: ["Admin of XYZ"],
    users: ['id4', 'id5', 'id6'
      // {
      //   username: "jdoe",
      //   password: "password",
      //   email: "johndoe@xyz.com",
      //   role: "user",
      //   name: "John",
      //   surname: "Doe",
      // },
      // {
      //   username: "asmith",
      //   password: "password",
      //   email: "alicesmith@xyz.com",
      //   role: "user",
      //   name: "Alice",
      //   surname: "Smith",
      // },
    ],
    creationDate: new Date("2022-01-01T00:00:00"),
    token: {
      name: "xyz-token",
      idTenant: 2,
      privileges: ["read"],
      value: "123456",
    },
    languages: ["English", "German", "Italian"],
    defaultLanguage: "German",
  },
];

export default tenantsArrayForTesting;
