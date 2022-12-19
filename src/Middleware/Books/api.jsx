import { API } from '../axios';

export const getAllBooks = () => API.get('books');
export const getBookById = () => API.get('books/:id');
