import TextCategory from "../../types/TextCategory";
import TextState from "../../types/TextState";

const textCategoriesArrayForTesting: TextCategory[] = [
  {
    idTenant: "1",
    idCategory: 'Category 1',
    language: 'English',
    isDefault: true,
    List: [
      {
        id: "1",
        text: "Welcome to our website!",
        state: TextState.verified,
        feedback: "Great intro text!",
        comment: "Needs a better headline",
        link: "/home"
      }
    ]
  },
  {
    idTenant: "2",
    idCategory: 'Category 2',
    language: 'Italian',
    isDefault: false,
    List: [
      {
        id: "2",
        text: "Benvenuto sul sito!",
        state: TextState.verified,
        feedback: "Buon testo!",
        comment: "Bene ma non benissimo",
        link: "/home"
      }
    ]
  },
  {
    idTenant: "3",
    idCategory: 'Category 3',
    language: 'French',
    isDefault: false,
    List: [
      {
        id: "3",
        text: "Bonjour a tout le monde",
        state: TextState.rejected,
        feedback: "Bien mais pas bien",
        comment: "",
        link: "/home"
      }
    ],
  },
];

export default textCategoriesArrayForTesting;