import { API } from '.';

export const getAllBooks = async () => {
  const response = await API.get('books');
  return response.data;
};

export const getBookById = () => API.get('books/:id');
