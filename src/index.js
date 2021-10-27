import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import { createBreakpoints } from '@chakra-ui/theme-tools';
const breakpoints = createBreakpoints({
  md: '860px',
});
const theme = extendTheme({ breakpoints });
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
