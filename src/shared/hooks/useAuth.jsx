import { useQuery } from 'react-query';

import * as api from '../../api';

const useAuth = () => {
  const { data: isAuthenticated } = useQuery('authenticated', api.fetchUser);

  return isAuthenticated;
};

export default useAuth;
