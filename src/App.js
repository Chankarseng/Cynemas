import React, { useState } from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
const App = () => {
  const [itemCount, setItemCount] = useState(0);
  const updateItemCount = (count) => {
    setItemCount(count);
  };
  return (
    <Switch>
      <Route path="/about">
        <About />
        <Footer itemCount={itemCount} component="about" />
      </Route>
      <Route path="/">
        <Home setItemCount={updateItemCount} />
        <Footer itemCount={itemCount} component="home" />
      </Route>
      <Footer />
    </Switch>
  );
};

export default App;
