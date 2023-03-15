import { useState } from "react";
import { TextField, Autocomplete } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface SearchBoxProps {
    searchQuery: string;
    setSearchQuery: (query: string, category?: string, language?: string) => void;
    selectedOption?: SearchOption;
}

// definire i tipi per le opzioni della ricerca
interface SearchOption {
    idTenant: number;
    idCategory: string;
    language: string;
    isDefault: boolean;
    List: string[];
}

// usare il tipo SearchOption per definire le opzioni
const options: SearchOption[] = [
    {
        idTenant: 1,
        idCategory: 'Category 1',
        language: 'English',
        isDefault: true,
        List: ['Content 1', 'Content 2', 'Content 3'],
    },
    {
        idTenant: 2,
        idCategory: 'Category 2',
        language: 'Italian',
        isDefault: false,
        List: ['Contenuto 1', 'Contenuto 2', 'Contenuto 3'],
    },
    {
        idTenant: 3,
        idCategory: 'Category 3',
        language: 'French',
        isDefault: false,
        List: ['Contenu 1', 'Contenu 2', 'Contenu 3'],
    },
];

export default function SearchBox({ searchQuery, setSearchQuery }: SearchBoxProps) {
    //HOOKS
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [language, setLanguage] = useState<string | undefined>(undefined);
  
    //LOGIC
    const handleSearch = () => {
      if (language || category) { // se è selezionata la lingua o la categoria cerca solo in quelle
      setSearchQuery(query, category, language);
      } else { // altrimenti cerca in tutte le lingue e categorie
      options.forEach((option) => {
      setSearchQuery(query, option.idCategory, option.language);
      });
      }
    };

    const [categoryOption, setCategoryOption] = useState<SearchOption | null>(null);
    const [languageOption, setLanguageOption] = useState<SearchOption | null>(null);
  
  return (
    <>
    <Autocomplete
    value={categoryOption}
    onChange={(_event, newValue) => {
    setCategoryOption(newValue);
    setCategory(newValue ? newValue.idCategory : undefined);
    }}
    options={options}
    getOptionLabel={(option) => option.idCategory}
    renderInput={(params) => <TextField {...params} label="Category" />}
    />
    <Autocomplete
    value={languageOption}
    onChange={(_event, newValue) => {
    setLanguageOption(newValue);
    setLanguage(newValue ? newValue.language : undefined);
    }}
    options={options}
    getOptionLabel={(option) => option.language}
    renderInput={(params) => <TextField {...params} label="Language" />}
    />
    <TextField
    label="Search"
    value={query}
    onChange={(event) => setQuery(event.target.value)}
    onKeyDown={(event) => {
    if (event.key === 'Enter') {
    handleSearch();
    }
    }}
    InputProps={{
    endAdornment: (
    <IconButton onClick={handleSearch}>
    <SearchIcon />
    </IconButton>
    ),
    }}
    />
    </>
    );
    

  }
