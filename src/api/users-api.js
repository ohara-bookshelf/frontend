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

export const getAllUserBookshelves = () => API.get('users/bookshelves');

export const getUserBookshelfDetail = async (bookshelfId) => {
  const response = await API.get(`users/bookshelves/${bookshelfId}`);
  return response.data;
};

export const createBookshelf = async (bookshelf) => {
  const response = await API.post('users/bookshelves', bookshelf);
  return response.data;
};

export const updateBookshelf = async ({ param, body }) => {
  const response = await API.patch(`users/bookshelves/${param}`, body);
  return response.data;
};

export const deleteBookshelf = async (bookshelfId) => {
  const response = await API.delete(`users/bookshelves/${bookshelfId}`);
  return response.data;
};

export const deleteBookshelfBooks = async ({ param, body }) => {
  const response = await API.delete(`users/bookshelves/${param}/books`, {
    data: body,
  });
  return response.data;
};

export const getUserForkedBookshelf = async (forkshelfId) => {
  const response = await API.get(`users/forks/${forkshelfId}`);
  return response.data;
};

export const forkBookshelf = async (bookshelfId) => {
  const response = await API.post(`users/bookshelves/${bookshelfId}/fork`);
  return response.data;
};

export const deleteForkedBookshelf = async (forkshelfId) => {
  const response = await API.delete(`users/forks/${forkshelfId}`);
  return response.data;
};
