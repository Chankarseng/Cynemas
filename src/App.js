import {
  Container,
  SimpleGrid,
  GridItem,
  Button,
  VStack,
  Input,
  Box,
  useToast,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SearchItem from './components/SearchItem';
import SearchCountries from './components/SearchCountries';
import SearchProviders from './components/SearchProviders';
import ItemList from './components/ItemList';
import Header from './components/Header';
import searchService from './services/search';
import InfoAccordion from './components/InfoAccordion';
import Pagination from './components/Pagination';
import { filterItems } from './utils/filterMovie';
import FilterAccordion from './components/FilterAccordion';
function App() {
  const colSpan = useBreakpointValue({ base: 8, md: 7 });
  const submitButtonColSpan = useBreakpointValue({ base: 8, md: 1 });
  const [listOfMovies, setListOfMovies] = useState([]);
  const [listOfTvSeries, setListOfTvSeries] = useState([]);
  const [currentListOfItems, setCurrentListOfItems] = useState([]);

  // Filtering values
  const [inputValue, setInputValue] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  // Pagination use
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // For switching between Movie and TV search
  const [currentSearchType, setCurrentSearchType] = useState('Movies');
  const toast = useToast();

  useEffect(() => {
    const movieList = localStorage.getItem('cynemasAppListOfMovie');
    const tvList = localStorage.getItem('cynemasAppListOfTvSeries');
    if (movieList != null) {
      setListOfMovies(JSON.parse(movieList));
    }
    if (tvList != null) {
      setListOfTvSeries(JSON.parse(tvList));
    }
  }, []);

  useEffect(() => {
    if (currentSearchType === 'Movies') {
      setCurrentListOfItems(listOfMovies);
    } else if (currentSearchType === 'TV') {
      setCurrentListOfItems(listOfTvSeries);
    }
  }, [currentSearchType, listOfMovies, listOfTvSeries]);
  const handleSubmit = () => {
    if (currentSearchType === 'Movies') {
      inputValue.forEach(async (item) => {
        const movieDetails = await searchService.getMovieDetails(item.value);
        const movieId = movieDetails.data.id;
        if (
          listOfMovies.find((item) => {
            return item.id === movieId;
          })
        ) {
          toast({
            title: `Movie '${movieDetails.data.title}' is already added.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          setListOfMovies((oldList) => [...oldList, movieDetails.data]);
        }
      });
    } else if (currentSearchType === 'TV') {
      inputValue.forEach(async (item) => {
        const tvDetails = await searchService.getTVDetails(item.value);
        const tvId = tvDetails.data.id;
        if (
          listOfTvSeries.find((item) => {
            return item.id === tvId;
          })
        ) {
          toast({
            title: `TV series '${tvDetails.data.title}' is already added.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          setListOfTvSeries((oldList) => [...oldList, tvDetails.data]);
        }
      });
    }
    setInputValue([]);
  };
  const handleRemove = (movieId) => {
    const filteredListOfItem = currentListOfItems.filter((movie) => {
      return movie.id === movieId ? false : true;
    });
    if (currentSearchType === 'Movies') {
      setListOfMovies(filteredListOfItem);
    } else if (currentSearchType === 'TV') {
      setListOfTvSeries(filteredListOfItem);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredItemList = filterItems(
    currentListOfItems,
    titleFilter,
    selectedCountry,
    selectedProviders,
    currentSearchType
  );
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = filteredItemList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  useEffect(() => {
    if (currentItems < itemsPerPage) {
      setCurrentPage(1);
    }
  }, [currentItems, itemsPerPage]);
  const changeCurrentSearchType = (currentSearchType) => {
    setInputValue([]);
    setCurrentSearchType(currentSearchType === 'TV' ? 'Movies' : 'TV');
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
            <Header
              listOfMovies={listOfMovies}
              listOfTvSeries={listOfTvSeries}
              currentSearchType={currentSearchType}
              changeCurrentSearchType={changeCurrentSearchType}
            />
          </VStack>
        </Container>
      </Box>
      <Container maxW="container.xl" p={25}>
        <VStack mt={20} w="full" h="full" spacing={10} alignItems="flex-start">
          <SimpleGrid columns={8} spacing={5} rowGap={10} w="full">
            <GridItem colSpan={colSpan}>
              <Box size="lg" w="full">
                <SearchItem
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  currentSearchType={currentSearchType}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={submitButtonColSpan}>
              <Button
                size="lg"
                w="full"
                colorScheme="red"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </GridItem>
            <GridItem colSpan={8}>
              <InfoAccordion />
            </GridItem>
            <GridItem colSpan={2} display={{ base: 'none', lg: 'block' }}>
              <Input
                size="lg"
                placeholder="Filter By Title"
                onChange={({ target }) => setTitleFilter(target.value)}
              ></Input>
            </GridItem>
            <GridItem colSpan={3} display={{ base: 'none', lg: 'block' }}>
              <SearchProviders setSelectedProviders={setSelectedProviders} />
            </GridItem>
            <GridItem colSpan={2} display={{ base: 'none', lg: 'block' }}>
              <SearchCountries setSelectedCountry={setSelectedCountry} />
            </GridItem>
            <GridItem colSpan={1} display={{ base: 'none', lg: 'block' }}>
              <Button w="full" size="lg">
                Refresh
              </Button>
            </GridItem>
            <GridItem colSpan={8} display={{ base: 'block', lg: 'none' }}>
              <FilterAccordion
                setTitleFilter={setTitleFilter}
                setSelectedProviders={setSelectedProviders}
                setSelectedCountry={setSelectedCountry}
              />
            </GridItem>
            {currentItems.length !== 0 ? (
              <ItemList
                listOfItems={currentItems}
                titleFilter={titleFilter}
                selectedCountry={selectedCountry}
                selectedProviders={selectedProviders}
                handleRemove={handleRemove}
              />
            ) : null}
          </SimpleGrid>
        </VStack>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredItemList.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </Box>
  );
}

export default App;
