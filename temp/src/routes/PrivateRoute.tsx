import Loading from 'src/components/Preloader/Loading';
import useAuth from 'src/shared/hooks/useAuth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLoading = useAuth();

  return isLoading ? <Loading /> : children;
};

export default PrivateRoute;
