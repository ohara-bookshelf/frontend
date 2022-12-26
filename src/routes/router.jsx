import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../pages/';
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
        errorElement: <pages.Error />,
        children: [
          {
            index: true,
            element: <pages.Profile />,
            errorElement: <pages.Error />,
          },
          { path: ':bookshelfId', element: <pages.UserBookshelf /> },
        ],
      },
      {
        path: 'bookshelves',
        element: <Outlet />,
        errorElement: <pages.Error />,
        children: [
          { index: true, element: <pages.Bookshelves /> },
          { path: ':bookshelfId', element: <pages.Bookshelf /> },
        ],
      },
    ],
  },
]);

export default router;
