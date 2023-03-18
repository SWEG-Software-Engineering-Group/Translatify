import Text from './Text';

export default interface TextCategory {
    idTenant: string,
    idCategory: string,
    language: string,
    isDefault: boolean,
    List: Text[];
};