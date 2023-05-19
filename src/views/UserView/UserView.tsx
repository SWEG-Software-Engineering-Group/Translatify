import { useState, useEffect } from 'react';
import Picker from '../../components/Picker/Picker';
import LayoutWrapper from '../../components/LayoutWrapper/LayoutWrapper';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useAuth } from '../../hooks/useAuth';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import SearchBox from "../../components/SearchBox/SearchBox";
import UserTranslationItem from '../../components/UserTranslationItem/UserTranslationItem';
import { getData } from '../../services/axios/axiosFunctions';
import Text from '../../types/Text';

export default function UserView() {
  const [language, setLanguage] = useState<string>('');
  const [allLanguages, setAllLanguages] = useState<string[]>([]); 
  const [texts, setTexts] = useState<Text[]>([]);
  const [filteredTexts, setFilteredTexts] = useState<Text[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const auth = useAuth();
  
  const handleSearchChange = (newValue: string) => {
    setSearchTerm(newValue);
    let newFilteredTexts: Text[] = [];
  
    if (newValue) {
      newFilteredTexts = texts.filter((text) => {
        if (text.title) {
          return text.title.toLowerCase().includes(newValue.toLowerCase());
        }
        return false;
      });
    } else {
      newFilteredTexts = texts;
    }

    setFilteredTexts(newFilteredTexts);
  };
  
  useEffect(() => {
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant?.id}/secondaryLanguages`)
    .then(res =>{
        setAllLanguages(res?.data?.languages);
        if(res?.data?.languages?.length > 0) {
          setLanguage(res.data.languages[0]);
        }
      })
      .catch(err =>{
      })
  }, [auth.tenant]);
  
  useEffect(()=>{
    if (language) {
      getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant?.id}/${language}/state/rejectedTexts`)
        .then(res=>{
          let texts = res?.data?.texts ?? [];
          getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant?.id}/${language}/state/toBeTranslated`)
            .then(res=>{
              const toBeTranslated = res?.data?.texts;
              if(toBeTranslated)
                texts = texts.concat(toBeTranslated);
              setTexts(texts);
              setFilteredTexts(texts);
            })
            .catch(err=>{
            })
        })
        .catch(err=>{          
        })
    }
  },[language, auth.tenant])
  
  

  useEffect(() => {
    
  }, [searchTerm, texts]);

return (
  <PrivateRoute allowedUsers={['admin', 'user']} >
    <LayoutWrapper userType={auth?.user.group}>
      <PageTitle title='User Dashboard'/>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <SearchBox handleParentSearch={handleSearchChange} />
        </Grid>
        <Grid item xs={12}>
        {Array.isArray(allLanguages) && (
          <Picker
            id='Select language'
            value={language}
            onChange={(value: string) => setLanguage(value)}
            choices={allLanguages}
            onClear={() => {
              setLanguage(allLanguages[0]);
            }}
          />
        )}
        <div style={{display: 'flex', alignItems:'center', marginBlock:'1rem'}}>
          <div>Legend:</div>
          <div style={{width:'100%', marginLeft: '1rem'}}>
            <div style={{backgroundColor: '#ffdc7d', textAlign: 'center', marginBlock:'.5rem', border:'1px solid #8c8c8c'}}>Rejected texts</div>
            <div style={{backgroundColor: 'white', textAlign: 'center', marginBlock:'.5rem', border:'1px solid #8c8c8c'}}>New texts</div>
          </div>
        </div>
            <Grid container spacing={2} my={2}>
              {filteredTexts.length !== 0 ?
                filteredTexts.map((text, index) => (
                   <Grid key={text.title + index} item xs={12} sm={6} md={4}>
                      {text && text.title && <UserTranslationItem text={text}/>}
                    </Grid>
                 ))
                :
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <p>No texts found</p>
                </Grid>
              }
            </Grid>
        </Grid>
      </Grid>
    </LayoutWrapper>
  </PrivateRoute>
);
}

