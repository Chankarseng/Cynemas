import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { BrowserRouter as Router } from 'react-router-dom';
const breakpoints = createBreakpoints({
  sm: '30em',
  md: '52em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});
const theme = extendTheme({ breakpoints });
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
);
