import React, { ChangeEvent } from 'react';

interface LanguagePickerProps {
    id: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    languages: string[];
}
  
export default function LanguagePicker({ id, value, onChange, languages }: LanguagePickerProps){
const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
};

return (
    <>
    <label htmlFor={id}>Choose a language:</label>
    <select id={id} value={value} onChange={handleLanguageChange}>
        {languages.map((language) => (
        <option key={language} value={language}>
            {language}
        </option>
        ))}
    </select>
    </>
);
};