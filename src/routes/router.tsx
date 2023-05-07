import { createBrowserRouter, Outlet } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';
import Error from 'src/components/Error/Error';
import { PAGE } from 'src/shared/constants';
import ExploreLayout from 'src/layouts/ExploreLayout';

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
        element: <ExploreLayout />,
        children: [{ index: true, element: <pages.Bookshelves /> }],
      },
      {
        path: PAGE.BOOKSHELVES + '/:bookshelfId',
        element: <pages.Bookshelf />,
      },
      {
        path: PAGE.BOOKS,
        element: <ExploreLayout />,
        children: [
          {
            index: true,
            element: <pages.Books />,
          },
        ],
      },
      {
        path: PAGE.BOOKS + '/:bookId',
        element: <pages.Book />,
      },
      {
        path: PAGE.USERS,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <pages.Users />,
          },
          {
            path: ':userId',
            element: <pages.User />,
          },
        ],
      },
    ],
  },
]);

export default router;
