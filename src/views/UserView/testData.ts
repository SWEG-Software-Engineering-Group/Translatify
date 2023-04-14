import TextState from "../../types/TextState";
import TextCategory from "../../types/TextCategory";

const testData: TextCategory[] = [
  {
    idTenant: "1",
    idCategory: "1",
    language: "Italian",
    isDefault: true,
    List: [
      {
      id: "1",
      text: "Questo è il primo testo",
      state: TextState.toBeTranslated,
      feedback: "Questo testo potrebbe essere migliorato",
      comment: "Non sono sicuro della traduzione",
      link: "https://www.example.com/text/1",
      },
      {
      id: "2",
      text: "Questo è il secondo testo",
      state: TextState.toBeVerified,
      feedback: "Questa traduzione sembra essere corretta",
      comment: "Ho verificato la traduzione con un madrelingua",
      link: "https://www.example.com/text/2",
      },
      {
      id: "3",
      text: "Questo è il terzo testo",
      state: TextState.verified,
      comment: "Ho verificato la traduzione con un team di traduttori",
      link: "https://www.example.com/text/3",
      },
      {
      id: "4",
      text: "Questo è il quarto testo",
      state: TextState.rejected,
      comment: "La traduzione contiene errori gravi",
      link: "https://www.example.com/text/4",
      },
    ],
  },
  // Aggiungi altre categorie di testo qui se necessario
];

export default testData;
