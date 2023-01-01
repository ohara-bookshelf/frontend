import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000 * 60,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers['authorization'] = `Bearer ${token}`;
  }

  return req;
});

export { login, fetchUser } from './auth-api';
export { getPopularBookshelf, getAllBookshelf } from './bookshelves-api';
export { getAllBooks, getRecommededBooks, getBookById } from './books-api';
export {
  getUserDetail,
  getUserBookshelfDetail,
  createBookshelf,
  updateBookshelf,
  deleteBookshelf,
  deleteBookshelfBooks,
  getUserForkedBookshelf,
  forkBookshelf,
  deleteForkedBookshelf,
} from './users-api';
