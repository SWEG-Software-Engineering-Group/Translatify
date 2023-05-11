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
    if(auth.tenant){
      getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/secondaryLanguages`)
      .then(res =>{
          setAllLanguages(res.data.languages);
          setLanguage(res.data.languages[0]);
        })
        .catch(err =>{
        })
    }
  }, [auth.tenant]);
  
  useEffect(()=>{
    if(auth.tenant && language){
      getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/state/rejectedTexts`)  //checks if there are rejected texts
        .then(res=>{
          if(res.data.texts.length === 0){
            getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/state/toBeTranslated`) //if not, checks if there are texts to be translated
              .then(res=>{
                setTexts(res.data.texts);
                setFilteredTexts(res.data.texts);
              })
              .catch(err=>{
                throw err;
              })
          }
          else{
            setTexts(res.data.texts);
            setFilteredTexts(res.data.texts);
          }
        })
        .catch(err=>{
        })
    }
  },[language, auth.tenant])  

  useEffect(() => {
    
  }, [searchTerm, texts]);

return (
  <PrivateRoute allowedUsers={['admin', 'user']} >
    <LayoutWrapper userType={auth.user.group}>
      <PageTitle title='User Dashboard'/>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <SearchBox handleParentSearch={handleSearchChange} />
        </Grid>
        <Grid item xs={12}>
        {allLanguages && (
            <Picker
              id='Select language'
              value={language}
              onChange={(value: string) => setLanguage(value)}
              choices={allLanguages}
              onClear={() =>{
                setLanguage(allLanguages[0]);
              }}
            />
          )}         
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

