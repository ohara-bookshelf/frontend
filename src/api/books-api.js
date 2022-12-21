import { API } from '.';

export const getAllBooks = () => API.get('books');
export const getBookById = () => API.get('books/:id');
