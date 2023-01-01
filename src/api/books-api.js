import { API } from '.';

export const getAllBooks = async () => {
  const response = await API.get('books');
  return response.data;
};

export const getRecommededBooks = async (title, count = 5) => {
  const response = await API.get(
    `books/recommended?title=${title}&count=${count}`
  );
  return response.data;
};

export const getBookById = () => API.get('books/:id');
