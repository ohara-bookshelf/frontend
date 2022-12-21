import { API } from '.';

export const createBookshelf = () => API.post('users/bookshelf');
export const getAllUserBookshelves = () => API.get('users/bookshelves');
