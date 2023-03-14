export default interface Token{
    name: string,
    idTenant: number,
    privileges: [string],
    value: string,
};