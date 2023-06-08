import { AxiosResponse } from 'axios';
import { API } from '.';
import { Expression, IBook, IBookReview, IMeta } from 'src/shared/interfaces';

const PATH = '/books';

export const bookAPI = {
  findBooks: async (queryString: string) => {
    const res: AxiosResponse<{ data: IBook[]; meta: IMeta }> = await API.get(
      `${PATH}?${queryString}`
    );
    return res;
  },
  findBookById: async (bookId: string) => {
    const res: AxiosResponse<IBook> = await API.get(`${PATH}/${bookId}`);
    return res;
  },
  getRecommendation: async (isbn?: string | null, count = 10) => {
    const params = new URLSearchParams();

    params.append('count', count.toString());

    if (isbn) {
      params.append('isbn', isbn);
    }

    const queryString = params.toString();

    const res: AxiosResponse<IBook[]> = await API.get(
      `${PATH}/recommended?${queryString}`
    );
    return res;
  },
  getBooksByExpression: async (body: {
    imageString64: string;
    take: number;
  }) => {
    const res: AxiosResponse<{
      books: IBook[];
      expression: Expression;
      genres: string[];
    }> = await API.post(`${PATH}/by-expression`, body);
    return res;
  },
  getBookReviews: async (bookId: string) => {
    const res: AxiosResponse<{ reviews: IBookReview[]; rating: number }> =
      await API.get(`${PATH}/${bookId}/reviews`);
    return res;
  },
};
