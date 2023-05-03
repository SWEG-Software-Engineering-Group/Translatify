import TextState from "../../../types/TextState";
import TextCategory from "../../../types/TextCategory";

const testData: TextCategory[] = [
  {
    idTenant: "c4ab17d2-f635-4f75-acdf-1a4a6cab4f3",
    idCategory: "1",
    language: "Italian",
    isDefault: true,
    List: [
      {
      idTenant: "c4ab17d2-f635-4f75-acdf-1a4a6cab4f3",
      title: "1",
      language: "Italian",
      text: "Questo è il primo testo",
      state: TextState.toBeTranslated,
      feedback: "Questo testo potrebbe essere migliorato",
      comment: "Non sono sicuro della traduzione",
      link: "https://www.example.com/text/1",
      category: {
        name: "Testi di test",
        id: '364ce815-3ab2-4bbb-960a-2562f6b99f38'
    },
      },
      {
      idTenant: "c4ab17d2-f635-4f75-acdf-1a4a6cab4f3",
      title: "2",
      language: "Italian",
      text: "Questo è il secondo testo",
      state: TextState.toBeVerified,
      feedback: "Questa traduzione sembra essere corretta",
      comment: "Ho verificato la traduzione con un madrelingua",
      link: "https://www.example.com/text/2",
      category: {
        name: "Testi di test",
        id: '364ce815-3ab2-4bbb-960a-2562f6b99f38'
    },
      },
      {
      idTenant: "c4ab17d2-f635-4f75-acdf-1a4a6cab4f3",
      title: "3",
      language: "CORS",
      text: "Questo è il terzo testo",
      state: TextState.verified,
      feedback: "La traduzione è perfetta",
      comment: "Ho verificato la traduzione con un team di traduttori",
      link: "https://www.example.com/text/3",
      category: {
        name: "Testi di test",
        id: '364ce815-3ab2-4bbb-960a-2562f6b99f38'
    },
      },
      {
      idTenant: "c4ab17d2-f635-4f75-acdf-1a4a6cab4f3",
      title: "4",
      language: "CORS",
      text: "Questo è il quarto testo",
      state: TextState.rejected,
      feedback: "Questa traduzione è inaccettabile",
      comment: "La traduzione contiene errori gravi",
      link: "https://www.example.com/text/4",
      category: {
        name: "Testi di test",
        id: '364ce815-3ab2-4bbb-960a-2562f6b99f38'
    },
      },
    ],
  },
  // Aggiungi altre categorie di testo qui se necessario
];

export default testData;
