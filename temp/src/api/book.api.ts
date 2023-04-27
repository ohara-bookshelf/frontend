import { AxiosResponse } from 'axios';
import { API } from '.';
import { IBook } from 'src/shared/interfaces';

const PATH = '/books';

export const bookAPI = {
  findBooks: async (queryString: string) => {
    const res: AxiosResponse<IBook[]> = await API.get(`${PATH}?${queryString}`);
    return res;
  },
};
