import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: () => ({
    '*, *::before, &::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'inherit',
    },
    body: {
      boxSizing: 'border-box',
    },
  }),
};

const theme = extendTheme({
  styles,
  config,
});

export default theme;
