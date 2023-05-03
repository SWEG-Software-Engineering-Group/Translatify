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
  };

  useEffect(() => {
    // Load languages when component mounts
    getData(`${process.env.REACT_APP_API_KEY}/tenant/${auth.tenant.id}/secondaryLanguages`)
    .then(res =>{
      console.log(res.data, "DATA");
      setAllLanguages(res.data.languages);
      setLanguage(res.data.languages[0]);      
    })
    .catch(err =>{
      
    })
  }, [auth.tenant.id]);

  useEffect(()=>{
    getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/rejectedTexts`)  //checks if there are rejected texts
    .then(res=>{
      if(res.data.texts.length === 0){
        getData(`${process.env.REACT_APP_API_KEY}/text/${auth.tenant.id}/${language}/toBeTranslated`) //if not, checks if there are texts to be translated
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
      alert(err);
    })
  },[language, auth.tenant.id])

  useEffect(() => {
      let newFilteredTexts : Text[] = [];
    // Filter the texts based on the search term
    if (searchTerm) {
      newFilteredTexts = texts
        .filter((text) =>{
          if(text.text && text.id){
            return (text.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            text.id.toLowerCase().includes(searchTerm.toLowerCase()))
          }
          else return false;
        }
        )        
    }
    else if (searchTerm === '')
      newFilteredTexts = texts;

    // Update the state with the filtered texts
    setFilteredTexts(newFilteredTexts);
  }, [searchTerm]);

return (
  <PrivateRoute allowedUsers={['admin', 'user']} >
    <LayoutWrapper userType={auth.user.group}>
      <PageTitle title='User Dashboard'/>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
            <SearchBox handleParentSearch={handleSearchChange} />
          </Grid>
        <Grid item xs={12}>
          <Picker
            id='Select language'
            value={language}
            onChange={(value: string) => setLanguage(value)}
            choices={allLanguages}
            onClear={() =>{
              setLanguage(allLanguages[0]);
            }}
          />          
            <Grid container spacing={2} my={2}>
              {filteredTexts.length !== 0 ?
                filteredTexts.map((text) => (
                   <Grid key={text.id} item xs={12} sm={6} md={4}>
                      {text && text.category && text.category.id && text.language && <UserTranslationItem key={text.id} language={text.language} idCategory={text.category.id} text={text}/>}
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

