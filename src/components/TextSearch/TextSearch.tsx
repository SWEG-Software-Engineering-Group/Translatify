import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import SearchIcon from '@mui/icons-material/Search';


interface TextSearchProps{
    handleParentSearch : (query : string) => void;
}

export default function TextSearch({handleParentSearch} : TextSearchProps) {
    //HOOKS
    const [query, setQuery] = useState('');


    //LOGIC
    //(functions)

    const handleSearch = () => {
        if(query) handleParentSearch(query);
        else handleParentSearch('');
    };


    const handleKeyPress  = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    //UI
    return(
        <>
            <TextField
                variant="outlined"
                placeholder="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={handleKeyPress}
            />
            <IconButton onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </>
    )
}