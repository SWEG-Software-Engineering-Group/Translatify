import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface MultipleLanguagesPickerProps{
    onChange : (data : string[]) => void;
    languages: string[];
    previousSelectedLanguages?: string[];
  }

export default function MultipleLanguagesPicker({onChange, languages, previousSelectedLanguages} : MultipleLanguagesPickerProps) {
    //HOOKS
    //LOGIC
    //(functions)
    
  let checked : boolean[] = (previousSelectedLanguages ? languages.map((lang) => previousSelectedLanguages.includes(lang)) : []);
  function filterLanguages() {
    onChange(languages.filter((lang: string, index: number) => checked[index] ? true : false));
  }

  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setChecked(checked.map(()=>event.target.checked));
    checked = checked.fill(event.target.checked);
    filterLanguages();
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index : number) => {
    checked[index] = event.target.checked;
    filterLanguages();
  };
  
  const languagesComboBoxes = languages.map((lang, index)=>{
    return <FormControlLabel
    key={index}
    label={lang}
    control={<Checkbox checked={checked[index]} onChange={(event)=>handleChange(event, index)} />}
    />
  })    
  ;
  

  //UI
  return (
    <div>
      {languages.length > 0 ? 
      <React.Fragment>
        <FormControlLabel
          label="Secondary languages"
          control={
            <Checkbox
              checked={(()=>{
                let allTrue = checked.every(element => element === true);
                if (allTrue) return true;
                return false;
              })()}
              indeterminate={(()=>{
                let allTrue = checked.every(element => element === true);
                if (allTrue) return false;
                let allFalse = checked.every(element => element === false);
                if (allFalse) return false;
                return true;
              })()}
              onChange={toggleAll}
            />
          }
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {languagesComboBoxes}
        </Box>
      </React.Fragment>
      
      :
      
      <React.Fragment></React.Fragment>
      }
    </div>
  );
}