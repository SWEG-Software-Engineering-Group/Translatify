import { Autocomplete, TextField } from '@mui/material';

interface CategoryPickerProps {
    id: string;
    value: string | null;
    onChange: (value : string) => void;
    choices: string[];
}

export default function Picker({ id, value, onChange, choices }: CategoryPickerProps) {
  const handleChange = (newValue: string | null) => {
    newValue ? onChange(newValue) : onChange(choices[0]);
  };

  return (
    <>
      <Autocomplete
        id={id}
        freeSolo
        options={choices}
        value={value}
        onChange={(event, newValue: string | null) => handleChange(newValue)}
        renderInput={(params) => <TextField {...params} label={id} fullWidth />}
      />
    </>
  );
}