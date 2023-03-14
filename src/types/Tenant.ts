import Token from './Token';
import User from './User';

export default interface Tenant{
    id: number,
    name: string,
    admin: string[],
    users: User[],
    creationDate: Date,
    token: Token,
    languages: string[],
    defaultLanguage: string;
};