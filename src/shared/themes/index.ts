import { extendTheme } from '@chakra-ui/react';
import { typography } from './typography';

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
    a: {
      _hover: {
        textDecoration: 'none !important',
      },
    },
    ...typography,
  }),
};

const theme = extendTheme({
  styles,
  config,
});

export default theme;
