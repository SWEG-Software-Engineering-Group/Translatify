// import Auth from '@aws-amplify/auth';
import axios from 'axios';

// in order to use Auth we need to use the headers from getDefaultHeaders() inside axios functions 

// async function getDefaultHeaders(){
//     const user = await Auth.currentAuthenticatedUser();
//     console.log('user', user);
//     const token = user.signinUserSession.idtoken.jwtToken;
//      return {headers: {'Authorization' : `Bearer ${token}`}}
// }

// export async function getData(url:string){
//     const headers = await getDefaultHeaders();
//     return axios.get(url, headers);
// }


export async function getData(url:string){
    return axios.get(url);
}

export async function deleteData(url:string){
    return axios.delete(url);
}

export async function putData(url:string, data:unknown){
    return axios.put(url, data);
}

export async function postData(url:string, data:unknown){
    return axios.post(url, data);
}