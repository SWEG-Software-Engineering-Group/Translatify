import { useState } from "react";
import { TextField, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBoxProps{
    handleParentSearch : (query : string) => void;    
}

export default function SearchBox({handleParentSearch} : SearchBoxProps) {
    const [query, setQuery] = useState<string>('');

    const handleSearch = () => {
        if(query) handleParentSearch(query);
        else handleParentSearch('');
    };

    const handleKeyPress  = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return(
        <Box sx={{position:"relative", display:'flex', alignItems:'center'}}>
            <TextField                
                fullWidth
                variant="outlined"
                placeholder="Type here to search..."
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