import { API } from '.';

const PATH = '/auth';

export const authAPI = {
  login: async () => {
    return await API.post(`${PATH}/login`);
  },
  fetchUser: async () => {
    return await API.get(`${PATH}/user`);
  },
};
