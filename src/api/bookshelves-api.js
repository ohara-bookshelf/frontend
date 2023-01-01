import { API } from '.';

export const getPopularBookshelf = async () => {
  const response = await API.get('bookshelves/popular');
  return response.data;
};

export const getAllBookshelf = async () => {
  const response = await API.get('bookshelves');
  return response.data;
};

export const getRecommededBookshelves = async (title, count = 5) => {
  const response = await API.get(
    `bookshelves/recommended?title=${title}&count=${count}`
  );
  return response.data;
};
