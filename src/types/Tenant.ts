import Token from './Token';
import User from './User';

export default interface Tenant{
    id?: string,
    tenantName: string,
    admins: string[],   //admins ids
    users: string[], //users ids
    categories: string[], 
    creationDate: Date,
    // token: Token,
    languages: string[],
    defaultLanguage: string;
};