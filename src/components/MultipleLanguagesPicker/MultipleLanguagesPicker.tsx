import {useState, useEffect} from "react";
import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { key } from "localforage";


interface MultipleLanguagesPickerProps{
    onChange : (data : string[]) => void;
    oldData?: string[];
  }

export default function MultipleLanguagesPicker({onChange, oldData} : MultipleLanguagesPickerProps) {
    //HOOKS
    const [pickedLanguages, setPickedLanguages] = useState<string[]>(oldData ? oldData : []);
    const [checked, setChecked] = React.useState<boolean[]>([]);

    let languages : string[] = ['ita','eng','chi','jap'];

    useEffect(()=>{
        languages = ['ita','eng','chi','jap'];
        const checkedTmp = languages.map((lang : string)=>{
            return (pickedLanguages.includes(lang) ? true : false);
        });
        setChecked(checkedTmp);
        console.log(checkedTmp);
    },[pickedLanguages])
    console.log(pickedLanguages);

    //LOGIC
    //(functions)


  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked.map(()=>event.target.checked));
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index : number) => {
    setChecked(()=>{
        let newChecked : boolean[] = [...checked];
        newChecked[index] = event.target.checked;
        return newChecked;
    });
  };

  const languagesComboBoxes  = languages.map((lang, index)=>{
        return <FormControlLabel
                key={index}
                label={lang}
                control={<Checkbox checked={checked[index]} onChange={(event)=>handleChange(event, index)} />}
                />
    })    
  ;

console.log(languagesComboBoxes);
    //UI
  return (
    <div>
      <FormControlLabel
        label="Secondary languages"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={toggleAll}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {languagesComboBoxes}
      </Box>
    </div>
  );
}