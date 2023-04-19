import { useState } from "react";
import { TextField, Autocomplete } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import categoriesdata from "../../views/SuperAdminView/categoriesData";

const MAX_SEARCH_TERM_LENGTH = 100; // impostare una lunghezza massima ragionevole

export interface SearchBoxProps {
  onChange : (data : string) => void;
}

export default function SearchBox({onChange}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= MAX_SEARCH_TERM_LENGTH) { // verificare la lunghezza massima dell'input
      setSearchTerm(value);
    }
  };
  
  const handleSearch = () => {
    onChange(searchTerm);
  };
  
  const languageOptions = categoriesdata
  .map((category: { language: string; }) => category.language)
  .filter((language: string, index: any, self: string | any[]) => self.indexOf(language) === index);
  
  const categoryOptions = categoriesdata
  .map((category : {idCategory: string; }) => category.idCategory)
  .filter((category: string, index: any, self: string | any[]) => self.indexOf(category) === index);
  
  return (
  <>
    <Autocomplete
      freeSolo
      options={languageOptions}
      renderInput={(params) => <TextField {...params} label="Language" />}
    />
    <Autocomplete
      freeSolo
      options={categoryOptions}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
    <TextField 
        value={searchTerm} 
        onChange={handleSearchTermChange}
        label="Search"
        error={/[^a-zA-Z0-9\s]/.test(searchTerm)} 
        helperText={/[^a-zA-Z0-9\s]/.test(searchTerm) ? 'Invalid input' : null} 
    />
    <IconButton onClick={handleSearch}>
    <SearchIcon />
    </IconButton>
  </>
  );
}