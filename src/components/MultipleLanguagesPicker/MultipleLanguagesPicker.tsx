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
    
    const languages  : string[] = ['ita','eng','chi','jap'];
    //const [languages, setLanguages] = useState<string[]>(['ita','eng','chi','jap']);  maybe it should be used as state? probably not tho, since it can't change


    const checkBoxes= () =>{
      const checkedTmp = languages.map((lang : string)=>{
        return (pickedLanguages.includes(lang) ? true : false);
      });      
      return checkedTmp;
    }

    const [checked, setChecked] = React.useState<boolean[]>(checkBoxes());


    useEffect(()=>{
      setChecked(checkBoxes());        
    },[])

    useEffect(()=>{
      console.log(checked, 'checked');
      setPickedLanguages([...languages.filter((lang, index)=>{
          return checked[index] ? true : false;
        })
      ]);
    },[checked])

    useEffect(()=>{
      console.log(pickedLanguages, 'pickedLanguages');
      onChange(pickedLanguages);
    },[pickedLanguages])

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

  //UI
  return (
    <div>
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
    </div>
  );
}