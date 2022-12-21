import { API } from '.';

export const login = () => API.post('auth/login');
export const fetchUser = async () => {
  const response = await API.get('auth/user');
  return response.data;
};
