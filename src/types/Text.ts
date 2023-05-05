
import Category from "./Category";
import TextState from "./TextState"

export default interface Text {
    idTenant: string,    
    language: string,
    category : Category,
    title: string,
    text: string,
    state: TextState,
    comment?: string,
    link?: string,
    feedback?: string,
};

