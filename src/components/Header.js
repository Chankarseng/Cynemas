import React from 'react';
import {
  HStack,
  Heading,
  Button,
  Box,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  useColorMode,
  useToast,
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  DeleteIcon,
  DownloadIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { RiMovie2Fill } from 'react-icons/ri';
import { Icon } from '@chakra-ui/react';
const Header = ({
  listOfMovies,
  listOfTvSeries,
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
        JSON.stringify(listOfMovies)
      );
      localStorage.setItem(
        'cynemasAppListOfTvSeries',
        JSON.stringify(listOfTvSeries)
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
          title: 'All list has been cleared from your browser',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.removeItem('cynemasAppListOfMovie');
      localStorage.removeItem('cynemasAppListOfTvSeries');
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
    <Box w="full">
      <Flex display={{ base: 'flex', md: 'none' }}>
        <Box>
          <Heading>
            Cynemas <Icon boxSize={'8'} as={RiMovie2Fill} mb={1} />
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                onClick={() => changeCurrentSearchType(currentSearchType)}
                icon={<ViewIcon />}
              >
                Switch to search {switchSearchType}
              </MenuItem>

              <MenuItem onClick={() => saveResult()} icon={<DownloadIcon />}>
                Save
              </MenuItem>
              <MenuItem onClick={() => clearResult()} icon={<DeleteIcon />}>
                Clear
              </MenuItem>
              <MenuItem
                closeOnSelect={false}
                onClick={() => toggleColorMode()}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              >
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <HStack
        justify="space-between"
        w="full"
        h={20}
        display={{ base: 'none', md: 'flex' }}
      >
        <Heading size="2xl" isTruncated>
          Cynemas <Icon boxSize={'10'} as={RiMovie2Fill} mb={2} />
        </Heading>

        <Button
          leftIcon={<ViewIcon />}
          onClick={() => changeCurrentSearchType(currentSearchType)}
        >
          Switch to search {switchSearchType}
        </Button>
        <HStack align="center" spacing={3}>
          <Button leftIcon={<DownloadIcon />} onClick={saveResult}>
            Save
          </Button>
          <Button leftIcon={<DeleteIcon />} onClick={clearResult}>
            Clear
          </Button>
          <Button
            leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          >
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
export default Header;
