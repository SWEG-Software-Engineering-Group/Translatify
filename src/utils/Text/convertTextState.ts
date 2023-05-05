export default function convertTextState(state : string) : string{
    switch (state) {
        case 'toBeVerified':
            return 'To be verified';
        case 'verified':
            return 'Verified';
        case 'toBeTranslated':
            return 'To be translated';
        case 'rejected':
            return 'Rejected';
        default:
            return 'Original text';
    }
}