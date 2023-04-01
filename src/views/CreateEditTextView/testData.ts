import TextState from "../../types/TextState";
import Text from "../../types/Text";

const data : Text= {
    id: '',
    text: 'hello',        
    comment: 'this is a long comment that gives different instructions on how to translate this text',
    link: `different useful links
    text on a second line
    `,
    state: TextState.verified,
}

const selectedLanguages : string[] =  ['ita', 'jap', 'eng'];
const secondaryLanguages : string[] =  ['ita', 'spa', 'jap', 'eng'];
export {data, selectedLanguages, secondaryLanguages};

