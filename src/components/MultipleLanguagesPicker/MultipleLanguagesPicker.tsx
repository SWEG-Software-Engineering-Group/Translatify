import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

interface MultipleLanguagesPickerProps{
    onChange : (data : string[]) => void;
    languages: string[];
    previousSelectedLanguages?: string[];
}

export default function MultipleLanguagesPicker({onChange, languages, previousSelectedLanguages} : MultipleLanguagesPickerProps) {
  let checked : boolean[] = (previousSelectedLanguages ? languages.map((lang) => previousSelectedLanguages.includes(lang)) : []);
  function filterLanguages() {
    onChange(languages.filter((lang: string, index: number) => checked[index] ? true : false));
  }

  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  
  return (
    <div>
      {languages.length > 0 ? 
      <React.Fragment>
        <Typography variant='h6' component={'p'} align='center'>
          Select in which language this text needs to be translated:
        </Typography>
        <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
          <FormControlLabel
            label="All secondary languages"
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
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }} maxHeight={'240px'} overflow={'auto'}>
            {languagesComboBoxes}
          </Box>
        </div>
      </React.Fragment>
      :
      <Typography style={{fontStyle:'italic'}}>There is no secondary language in this tenant to select from</Typography>
      }
    </div>
  );
}


