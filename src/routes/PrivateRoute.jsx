import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as api from '../api';
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const { data: isAuthenticated } = useQuery('authenticated', api.fetchUser);
  return isAuthenticated ? children : navigate('/');
};

export default PrivateRoute;
