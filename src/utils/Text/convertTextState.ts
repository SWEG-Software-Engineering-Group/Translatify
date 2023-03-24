import TextState from "../../types/TextState";

export default function convertTextState(state : string) : string{
    switch (state) {
        case 'toBeVerified':
            return 'to be verified';
        case 'verified':
            return 'verified';
        case 'toBeTranslated':
            return 'to be translated';
        case 'rejected':
            return 'rejected';
        default:
            return 'verified'
            break;
    }
}