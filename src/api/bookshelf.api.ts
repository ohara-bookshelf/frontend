import { AxiosResponse } from 'axios';
import { API } from '.';
import { IBookshelf, IMeta } from 'src/shared/interfaces';

const PATH = '/bookshelves';

export const bookshelfAPI = {
  findMany: async (queryString?: string) => {
    const res: AxiosResponse<{ data: IBookshelf[]; meta: IMeta }> =
      await API.get(`${PATH}?${queryString}`);
    return res;
  },
  findOne: async (id: string) => {
    const res: AxiosResponse<IBookshelf> = await API.get(`${PATH}/${id}`);
    return res;
  },
  getRecommendation: async (isbn?: string | null, count = 10) => {
    const params = new URLSearchParams();

    params.append('count', count.toString());

    if (isbn) {
      params.append('isbn', isbn);
    }

    const queryString = params.toString();

    const res: AxiosResponse<IBookshelf[]> = await API.get(
      `${PATH}/recommended?${queryString}`
    );
    return res;
  },
  getPopular: async (queryString?: string) => {
    const res: AxiosResponse<IBookshelf[]> = await API.get(
      `${PATH}/popular?${queryString}`
    );
    return res;
  },
};
