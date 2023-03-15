import * as React from 'react';
import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';



interface CategoryOptionType {
  inputValue?: string;
  category: string;
}

const filter = createFilterOptions<CategoryOptionType>();

interface CategoryInputProps{
  onChange : (data : string) => void;
  oldData?: string;
}

export default function CategoryInput({onChange, oldData} : CategoryInputProps) {
  const [value, setValue] = useState<CategoryOptionType | null>(oldData ? {category:oldData} : null);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>('');
  useEffect(()=>{
    value && onChange(value?.category);
  },[value])

  const handleClose = () => {
    setDialogValue('');
    toggleOpen(false);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({category: dialogValue});
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue(newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.category);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              category: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}

        id="category-input"
        options={categories}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.category;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.category}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Category input" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a new category, are you sure you want to add it?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue}
              onChange={(event) =>
                setDialogValue(event.target.value)
              }
              label="category"
              type="text"
              variant="standard"
            />            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}


const categories: readonly CategoryOptionType[] = [
  {category : 'home'},
  {category : 'header'},
  {category : 'footer'},

  //will be replaced by an API call that load all the categories from the DB
];