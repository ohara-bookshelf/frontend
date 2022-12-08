import { API } from './axios';

export const fetchUser = () => API.get('auth/user');
export const login = (access_token) => API.post('auth/login', { access_token });