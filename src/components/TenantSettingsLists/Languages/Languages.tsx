import { Card, CardContent, CardHeader, Collapse, IconButton} from '@mui/material';
import {useState, useEffect} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageList from "./LanguageList/LanguageList";
import { getData } from '../../../services/axios/axiosFunctions';
import { useAuth } from '../../../hooks/useAuth';

export default function Languages(){
    const [open, setOpen] = useState<boolean>(false);
    const [langs, setLangs] = useState<string[]>([]);
    const {tenant} = useAuth() ?? {};

    useEffect(()=>{
        if (tenant?.id) {
            getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/secondaryLanguages`)
            .then(res=>{
              setLangs(res.data.languages);
            })
            .catch(err=>{
              console.log(err); 
            })
        }
      }, [tenant]);

    return(
        <Card>
        <CardHeader
            title="Language List"
            action={
                <IconButton
                    onClick={() => setOpen(!open)}
                    aria-label="expand"
                    size="small"
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            }
        >
        </CardHeader>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent>
                <LanguageList oldLanguages={langs} />
            </CardContent>
        </Collapse>
        </Card>
    )
};
