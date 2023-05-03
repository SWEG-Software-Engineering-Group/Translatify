import TextState from "../../types/TextState";
import Text from "../../types/Text";

const data : Text= {
    idTenant: 'c4ab17d2-f635-4f75-acdf-1a4a6cab4f3b',
    language: 'English',
    text: 'hello',
    title : 'Titolo testo',
    comment: 'this is a long comment that gives different instructions on how to translate this text',
    link: `different useful links
    text on a second line
    `,
    category: {
        name: "Testi di test",
        id: '364ce815-3ab2-4bbb-960a-2562f6b99f38'
    },
    state: TextState.verified,
}
export {data};

