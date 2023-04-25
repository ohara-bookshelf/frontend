import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  timeout: 1000 * 60,
});

API.interceptors.request.use((req) => {
  req.headers['authorization'] = `Bearer ${
    localStorage.getItem('access_token') || ''
  }`;

  return req;
});
