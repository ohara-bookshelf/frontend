import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import router from './routes/router';
import theme from './shared/themes';

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
