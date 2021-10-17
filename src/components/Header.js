import React from 'react';
import { HStack, Heading, Button, useColorMode, Link } from '@chakra-ui/react';
const Header = ({ listOfMovies }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const saveResult = () => {
    localStorage.setItem('cynemasAppListOfMovie', JSON.stringify(listOfMovies));
  };
  const clearResult = () => {
    localStorage.removeItem('cynemasAppListOfMovie');
  };
  return (
    <HStack justify="space-between" w="full" h={20}>
      <Heading size="2xl">Cynemas</Heading>
      <Link>
        <Button>Switch to search TV</Button>
      </Link>
      <HStack align="center" spacing={5}>
        <Button onClick={saveResult}>Save</Button>
        <Button onClick={clearResult}>Clear</Button>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </HStack>
    </HStack>
  );
};
export default Header;
