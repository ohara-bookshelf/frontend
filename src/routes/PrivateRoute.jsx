import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../shared/hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
