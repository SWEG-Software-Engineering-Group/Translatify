export default interface Tenant{
    id?: string,
    tenantName: string,
    admins: string[],   //admins ids
    users: string[], //users ids
    categories: string[], 
    creationDate: number,
    languages: string[],
    defaultLanguage: string;
};