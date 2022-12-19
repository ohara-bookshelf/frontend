import { API } from '../../axios';

export const createBookshelf = () => API.post('users/bookshelf');
export const getAllUserBookshelves = () => API.get('users/bookshelves');
