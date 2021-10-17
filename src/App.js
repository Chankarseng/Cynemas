import {
  Container,
  SimpleGrid,
  GridItem,
  Button,
  VStack,
  Input,
  Box,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import SearchCountries from './components/SearchCountries';
import SearchProviders from './components/SearchProviders';
import MovieList from './components/MovieList';
import Header from './components/Header';
import searchService from './services/search';
import InfoAccordion from './components/InfoAccordion';


function App() {
  const colSpan = useBreakpointValue({ base: 8, md: 7 });
  const submitButtonColSpan = useBreakpointValue({ base: 8, md: 1 });

  const [listOfMovies, setListOfMovies] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    const movieList = localStorage.getItem('cynemasAppListOfMovie');
    if (movieList != null) {
      setListOfMovies(JSON.parse(movieList));
    }
  }, []);

  const handleClick = () => {
    inputValue.forEach(async (movie) => {
      const movieDetails = await searchService.getMovieDetails(movie.value);
      setListOfMovies((oldList) => [...oldList, movieDetails.data]);
    });
    setInputValue([]);
  };

  return (
    <Box>
      <Box
        display={{ base: 'none', md: 'block' }} // When medium size or below make the navbar at the bottom
        position="fixed"
        w="full"
        zIndex={99}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px"
      >
        <Container maxW="container.xl">
          <VStack align="start" spacing={0}>
            <Header listOfMovies={listOfMovies} />
          </VStack>
        </Container>
      </Box>
      <Container maxW="container.xl" p={25}>
        <VStack mt={20} w="full" h="full" spacing={10} alignItems="flex-start">
          <SimpleGrid columns={8} spacing={5} rowGap={10} w="full">
            <GridItem colSpan={colSpan}>
              <Box size="lg" w="full">
                <Search inputValue={inputValue} setInputValue={setInputValue} />
              </Box>
            </GridItem>
            <GridItem colSpan={submitButtonColSpan}>
              <Button
                size="lg"
                w="full"
                colorScheme="red"
                onClick={handleClick}
              >
                Submit
              </Button>
            </GridItem>
            <GridItem colSpan={8}>
              <InfoAccordion />
            </GridItem>
            <GridItem colSpan={2}>
              <Input
                size="lg"
                placeholder="Filter By Title"
                onChange={({ target }) => setTitleFilter(target.value)}
              ></Input>
            </GridItem>
            <GridItem colSpan={3}>
              <SearchProviders setSelectedProviders={setSelectedProviders} />
            </GridItem>
            <GridItem colSpan={2}>
              <SearchCountries setSelectedCountry={setSelectedCountry} />
            </GridItem>
            <GridItem colSpan={1}>
              <Button w="full">Refresh</Button>
            </GridItem>
            {listOfMovies.length !== 0 ? (
              <MovieList
                listOfMovies={listOfMovies}
                titleFilter={titleFilter}
                selectedCountry={selectedCountry}
                selectedProviders={selectedProviders}
              />
            ) : null}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
