import React from 'react';

import Loading from '../components/PreLoader/Loading';

import useAuth from '../shared/hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const isLoading = useAuth();

  return isLoading ? <Loading /> : children;
};

export default PrivateRoute;
