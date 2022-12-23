import { API } from '.';

export const getUserDetail = async () => {
  const { data } = await API.get('users/me');

  // Group bookshelves by visibility
  const bookshelves = data.bookshelves.reduce((group, bookshelf) => {
    const { visible } = bookshelf;
    // Convert to PascalCase
    const parsedVisible = visible.replace(/(\w)(\w*)/g, function (_, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    });
    group[parsedVisible] = group[parsedVisible] ?? [];
    group[parsedVisible].push(bookshelf);
    return group;
  }, {});

  return {
    ...data,
    bookshelves,
  };
};
export const createBookshelf = () => API.post('users/bookshelf');
export const getAllUserBookshelves = () => API.get('users/bookshelves');
