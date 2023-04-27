import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

import * as api from 'src/api';
import { useAuthStore } from 'src/flux/store';

const useAuth = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return true;
};

export default useAuth;
