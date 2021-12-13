import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '52em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

// Initial theme configuration
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  breakpoints,
  config,
});

export default theme;
