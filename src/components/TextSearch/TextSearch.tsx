import {useState, useEffect} from "react";
import {TextField, Box } from "@mui/material";
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
        <Box sx={{position:"relative", display:'flex', alignItems:'center'}}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by ID"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={handleKeyPress}
            ></TextField>
            <IconButton onClick={handleSearch}
                sx={{
                    position:'absolute',
                    right: '1rem',
                }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    )
}