import React from 'react';
import {
  HStack,
  Heading,
  Button,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
const Header = ({
  currentListOfItems,
  currentSearchType,
  changeCurrentSearchType,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  
  const saveResult = () => {
    const id = 'saveResultToast';
    try {
      localStorage.setItem(
        'cynemasAppListOfMovie',
        JSON.stringify(currentListOfItems)
      );
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Results successfully saved in your browser',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        id,
        title:
          ('Some error occurred when saving results to your browser', error),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const clearResult = () => {
    const id = 'clearResultToast';
    try {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Movie list has been cleared from your browser',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.removeItem('cynemasAppListOfMovie');
    } catch (error) {
      toast({
        id,
        title:
          ('Some error occurred when clearing results to your browser', error),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const switchSearchType = currentSearchType === 'Movies' ? 'TV' : 'Movies';
  return (
    <HStack justify="space-between" w="full" h={20}>
      <Heading size="2xl">Cynemas</Heading>
      <Button onClick={() => changeCurrentSearchType(currentSearchType)}>
        Switch to search {switchSearchType}
      </Button>
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
