import Token from './Token';
import User from './User';

export default interface Tenant{
    id: number,
    tenantName: string,
    admins: string[],
    users: User[],
    creationDate: Date,
    token: Token,
    languages: string[],
    defaultLanguage: string;
};