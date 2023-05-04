import { Navigate } from 'react-router-dom';

import { useAuthStore } from 'src/flux/store';

const useAuth = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return true;
};

export default useAuth;
