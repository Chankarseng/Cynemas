import React, { useState } from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
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
        <Routes>
            <Route
                path="/faq"
                element={
                    <Flex minH="100vh" flexDirection="column">
                        <Faq />
                        <Footer component="faq" />
                    </Flex>
                }></Route>
            <Route
                path="/about"
                element={
                    <Flex minH="100vh" flexDirection="column">
                        <About />
                        <Footer component="about" />
                    </Flex>
                }></Route>
            <Route
                path="/"
                element={
                    <Flex minH="100vh" flexDirection="column">
                        <Home setItemCount={updateItemCount} />
                        <Footer itemCount={itemCount} component="home" />
                    </Flex>
                }></Route>
            {/* <Footer /> */}
        </Routes>
    );
};

export default App;
