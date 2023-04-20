import {Auth} from 'aws-amplify';
import axios from 'axios';

// in order to use Auth we need to use the headers from getDefaultHeaders() inside axios functions 

async function getDefaultHeaders(){
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    return {headers: {'Authorization' : `Bearer ${token}`}}
}

export async function getData(url:string){
    const headers = await getDefaultHeaders();
    return axios.get(url, headers);
}

export async function deleteData(url:string, data:unknown){
    const headers = await getDefaultHeaders();
    return axios.delete(url, headers);
}

export async function putData(url:string, data:unknown){
    const headers = await getDefaultHeaders();
    return axios.put(url, data, headers);
}

export async function postData(url:string, data:unknown){
    const headers = await getDefaultHeaders();
    return axios.post(url, data, headers);
}