import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { useAuthStore } from './flux/store';
import * as API from './api';
import { useDisclosure } from '@chakra-ui/react';
import Loading from './components/Preloader/Loading';
function App() {
  const { setIsAuthenticated } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      onOpen;
      try {
        const { data } = await API.authAPI.fetchUser();

        if (data) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        onClose();
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isOpen) return <Loading />;
  return <RouterProvider router={router} />;
}

export default App;
