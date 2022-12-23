import { useNavigate } from 'react-router-dom';

import useAuth from '../shared/hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = useAuth();
  return isAuthenticated ? children : navigate('/');
};

export default PrivateRoute;
