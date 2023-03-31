import { Autocomplete, TextField } from '@mui/material';

interface CategoryPickerProps {
    id: string;
    value: string;
    onChange: (value : string) => void;
    choices: string[];
}
  
export default function Picker({ id, value, onChange, choices }: CategoryPickerProps){
    const handleLanguageChange = (newValue : string | null) => {
        newValue ? onChange(newValue) : onChange('ALL');
    };

    return (
        <>
        <Autocomplete id={id}            
            options={choices}
            value={value}
            onChange={(event, newValue : string | null) : void => handleLanguageChange(newValue)}
            renderInput={(params) => <TextField  {...params} label={id}/>}
        />
        {/* 
        <label htmlFor={id}>Choose a {id}:</label>
        <select id={id} value={value} onChange={handleLanguageChange}>
            {choices.map((choice) => (
            <option key={choice} value={choice}>
                {choice}
            </option>
            ))}
        </select> */}
        </>
    );
};

