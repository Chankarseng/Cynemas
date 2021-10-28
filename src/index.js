import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import { createBreakpoints } from '@chakra-ui/theme-tools';
const breakpoints = createBreakpoints({
  sm: "30em",
  md: '52em',
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});
const theme = extendTheme({ breakpoints });
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
