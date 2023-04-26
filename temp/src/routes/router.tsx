import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    errorElement: <pages.Error />,
    children: [
      { index: true, element: <pages.Dashboard /> },
      {
        path: 'profile',
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
          { path: ':bookshelfId', element: <pages.UserBookshelf /> },
          {
            path: 'forks',
            element: <Navigate to="/profile" />,
            caseSensitive: true,
          },
          {
            path: 'forks/:forkshelfId',
            element: <pages.UserForkshelf />,
            caseSensitive: true,
          },
        ],
      },
      {
        path: 'bookshelves',
        element: <Outlet />,
        children: [
          { index: true, element: <pages.Bookshelves /> },
          { path: ':bookshelfId', element: <pages.Bookshelf /> },
        ],
      },
    ],
  },
]);

export default router;
