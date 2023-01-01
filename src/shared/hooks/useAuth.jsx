import React from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

import * as api from '../../api';

const useAuth = () => {
  const { isLoading, error } = useQuery('authenticated', api.fetchUser);

  if (error) {
    return <Navigate to="/" />;
  }

  return isLoading;
};

export default useAuth;
