export default interface Tenant{
    id?: string,
    tenantName: string,
    admins: string[],
    users: string[],
    categories: string[], 
    creationDate: number,
    languages: string[],
    defaultLanguage: string;
};