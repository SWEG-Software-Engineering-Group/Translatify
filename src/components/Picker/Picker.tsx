import { Autocomplete, TextField } from '@mui/material';

interface PickerProps {
    id: string;
    value: string | null;
    onChange: (value : string) => void;
    choices: string[];
    onClear: () => void;
}

export default function Picker({ id, value, onChange, choices, onClear }: PickerProps) {
  const handleChange = (newValue: string | null) => {
    newValue ? onChange(newValue) : onClear();
  };

  return (
    <>
      <Autocomplete
        id={id}
        options={choices}
        value={value}
        onChange={(event, newValue: string | null) => handleChange(newValue)}
        renderInput={(params) => <TextField {...params} label={id} fullWidth />}
      />
    </>
  );
}
