import { AxiosResponse } from 'axios';
import { API } from '.';
import { IBookshelf } from 'src/shared/interfaces';

const PATH = '/bookshelves';

export const bookshelfAPI = {
  findMany: async (queryString?: string) => {
    const res: AxiosResponse<IBookshelf[]> = await API.get(
      `${PATH}?${queryString}`
    );
    return res;
  },
  getRecommendation: async (title: string, count = 10) => {
    const queryString = new URLSearchParams({
      title,
      count: count.toString(),
    }).toString();

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
