import {TextState} from "./TextState"

export default interface Text {
    id: string,
    text: string,
    state: TextState,
    feedback?: string,
    comment?: string,
    link?: string,
};

