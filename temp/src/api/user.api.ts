import { AxiosResponse } from 'axios';
import { API } from '.';
import { IBookshelf, IUser, Visibility } from 'src/shared/interfaces';

const PATH = '/users';

type CreateBookshelf = {
  name: String;
  description: String;
  visible: Visibility;
  books: String[];
};

type UpdateBookshelf = {
  name?: String;
  description?: String;
  visible?: Visibility;
  books?: String[];
};

export const userAPI = {
  getMe: async () => {
    const res: AxiosResponse<IUser> = await API.get(`${PATH}/me`);
    return res;
  },

  getUserBookshelf: async (bookshelfId: string) => {
    const res: AxiosResponse<IBookshelf> = await API.get(
      `${PATH}/bookshelves/${bookshelfId}`
    );
    return res;
  },

  createBookshelf: async (bookshelf: CreateBookshelf) => {
    const res: AxiosResponse<IBookshelf> = await API.post(
      `${PATH}/bookshelves`,
      bookshelf
    );
    return res;
  },

  updateUserBookshelf: async (
    bookshelfId: string,
    bookshelf: UpdateBookshelf
  ) => {
    const res: AxiosResponse<IBookshelf> = await API.patch(
      `${PATH}/bookshelves/${bookshelfId}`,
      bookshelf
    );
    return res;
  },
  removeUserBookshelfBook: async (bookshelfId: string, bookId: string) => {
    const res: AxiosResponse<{ bookshelfId: string; bookId: string }> =
      await API.delete(`${PATH}/bookshelves/${bookshelfId}/books/${bookId}`);
    return res;
  },
  deleteUserBookshelf: async (bookshelfId: string) => {
    const res: AxiosResponse<{ bookshelfId: string }> = await API.delete(
      `${PATH}/bookshelves/${bookshelfId}`
    );
    return res;
  },
};
