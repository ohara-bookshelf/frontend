import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

import * as api from 'src/api';

const useAuth = () => {
  const { isLoading, error } = useQuery('authenticated', () => {});

  if (error) {
    return <Navigate to="/" />;
  }

  return isLoading;
};

export default useAuth;
