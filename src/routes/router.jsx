import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../Pages/';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <pages.Dashboard /> },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <pages.Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'bookshelves',
        element: <pages.Bookshelves />,
        children: [{ path: ':bookshelfId', element: <pages.Bookshelf /> }],
      },
    ],
  },
]);

export default router;
