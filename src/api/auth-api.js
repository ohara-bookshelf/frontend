import { API } from '.';

export const login = () => API.post('auth/login');
export const fetchUser = async () => {
  try {
    await API.get('auth/user');
    return true;
  } catch (error) {
    return false;
  }
};
