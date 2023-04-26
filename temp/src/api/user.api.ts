import { AxiosResponse } from 'axios';
import { API } from '.';
import { IUser } from 'src/shared/interfaces';

const PATH = '/users';

export const userAPI = {
  getMe: async () => {
    const res: AxiosResponse<IUser> = await API.get(`${PATH}/me`);
    return res;
  },
};
