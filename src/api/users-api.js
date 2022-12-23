import { API } from '.';

export const getUserDetail = async () => {
  const { data } = await API.get('users/me');

  // Group bookshelves by visibility
  const bookshelves = data.bookshelves.reduce((group, bookshelf) => {
    const { visible } = bookshelf;

    group[visible.toLowerCase()] = group[visible.toLowerCase()] ?? [];
    group[visible.toLowerCase()].push(bookshelf);
    return group;
  }, {});

  return {
    ...data,
    bookshelves,
  };
};
export const createBookshelf = () => API.post('users/bookshelf');
export const getAllUserBookshelves = () => API.get('users/bookshelves');
