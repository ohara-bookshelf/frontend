import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';
import Error from 'src/components/Error/Error';
import { PAGE, PAGE_PATH } from 'src/shared/constants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <pages.Dashboard /> },
      {
        path: PAGE.PROFILE,
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <pages.Profile />,
          },
          {
            path: PAGE.MOOD_ASSISTANT,
            element: <pages.UserAssistant />,
            caseSensitive: true,
          },
          { path: PAGE.USER_BOOKSHELF, element: <pages.UserBookshelf /> },
          {
            path: PAGE.USER_FORKSHELF,
            element: <pages.UserForkshelf />,
            caseSensitive: true,
          },
        ],
      },
      {
        path: PAGE.BOOKSHELVES,
        element: <Outlet />,
        children: [
          { index: true, element: <pages.Bookshelves /> },
          { path: ':bookshelfId', element: <pages.Bookshelf /> },
        ],
      },
      {
        path: PAGE.BOOKS,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <pages.Books />,
          },
          {
            path: ':bookId',
            element: <pages.Book />,
          },
        ],
      },
    ],
  },
]);

export default router;
