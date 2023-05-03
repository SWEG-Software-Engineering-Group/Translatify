import TextState from "./TextState"

export default interface Text {
    idTenant: string,    
    language: string,
    category : {
        name : string,
        id : string,
    },
    title: string,
    text: string,
    state: TextState,
    comment?: string,
    link?: string,
    feedback?: string,
};

