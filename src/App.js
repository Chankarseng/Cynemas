import React, { useState } from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Faq from './components/Faq';
import { Flex } from '@chakra-ui/react';
const App = () => {
  const [itemCount, setItemCount] = useState(0);
  const updateItemCount = (count) => {
    setItemCount(count);
  };
  return (
    <Switch>
      <Route path="/faq">
        <Flex minH="100vh" flexDirection="column">
          <Faq />
          <Footer component="faq" />
        </Flex>
      </Route>
      <Route path="/about">
        <Flex minH="100vh" flexDirection="column">
          <About />
          <Footer component="about" />
        </Flex>
      </Route>
      <Route path="/">
        <Flex minH="100vh" flexDirection="column">
          <Home setItemCount={updateItemCount} />
          <Footer itemCount={itemCount} component="home" />
        </Flex>
      </Route>
      <Footer />
    </Switch>
  );
};

export default App;
