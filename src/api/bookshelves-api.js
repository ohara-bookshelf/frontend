import { API } from '.';

export const getPopularBookshelf = async () => {
  const response = await API.get('bookshelves/popular');
  return response.data;
};
