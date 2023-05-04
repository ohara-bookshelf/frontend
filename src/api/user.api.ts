import { AxiosResponse } from 'axios';
import { API } from '.';
import {
  IBookshelf,
  IUser,
  IUserForkshelf,
  Visibility,
} from 'src/shared/interfaces';

const PATH = '/users';

type CreateBookshelf = {
  name: string;
  description: string;
  visible: Visibility;
  books: string[];
};

type UpdateBookshelf = {
  name?: string;
  description?: string;
  visible?: Visibility;
  books?: string[];
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

  getUserForkshelf: async (forkshelfId: string) => {
    const res: AxiosResponse<IUserForkshelf> = await API.get(
      `${PATH}/forkshelves/${forkshelfId}`
    );
    return res;
  },
};
