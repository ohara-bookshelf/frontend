import { API } from '.';

export const getUserDetail = async () => {
  const response = await API.get('users/me');
  return response.data;
};
export const createBookshelf = () => API.post('users/bookshelf');
export const getAllUserBookshelves = () => API.get('users/bookshelves');
