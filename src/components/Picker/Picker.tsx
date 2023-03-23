import React, { ChangeEvent } from 'react';

interface CategoryPickerProps {
    id: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    choices: string[];
}
  
export default function Picker({ id, value, onChange, choices }: CategoryPickerProps){
const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
};

return (
    <>
    <label htmlFor={id}>Choose a {id}:</label>
    <select id={id} value={value} onChange={handleLanguageChange}>
        {choices.map((choice) => (
        <option key={choice} value={choice}>
            {choice}
        </option>
        ))}
    </select>
    </>
);
};