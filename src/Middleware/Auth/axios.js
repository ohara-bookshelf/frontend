import axios from 'axios';



export const API = axios.create({ 
  baseURL: 'http://localhost:5000/api', 
  // timeout: 1000,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // },
});



API.interceptors.request.use((req) => {

  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers['authorization'] = `Bearer ${token}`;
  }
  
  return req;
});