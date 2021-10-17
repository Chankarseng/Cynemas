import React, { useEffect, useState } from 'react';
import { AsyncSelect } from 'chakra-react-select';
import searchService from '../services/search';
import { Center, Flex, Spacer } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
const Search = (props) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      const trendingMovies = await getTrending();
      setOptions(trendingMovies);
    })();
  }, []);
  const loadOptions = async (value, callback) => {
    callback(await filterData(value));
  };
  const filterData = async (value) => {
    if (value !== '') {
      const result = await searchService.searchMovie(value);

      // console.log('result', result);
      const finalResult = result.data.results
        .filter((data) => {
          // console.log(
          //   data.title,
          //   data.title.toLowerCase().includes(value.toLowerCase())
          // );
          return data.title.toLowerCase().includes(value.toLowerCase());
        })
        .map((result) => {
          const hasReleaseDate = result.hasOwnProperty('release_date');
          const releaseDate =
            hasReleaseDate === true ? result.release_date.substring(0, 4) : '';
          return {
            label: (
              <Flex>
                <Center>
                  {result.title} ({releaseDate})
                </Center>
                <Spacer />
                <Image
                  w={9}
                  fallbackSrc="https://via.placeholder.com/150"
                  alt=""
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                />
              </Flex>
            ),
            value: result.id,
          };
        });
      return finalResult;
    }
    return {};
  };
  const handleChange = (value) => {
    props.setInputValue(value);
  };

  const getTrending = async () => {
    const trendingMovies = await searchService.getTrendingMovies();
    const trendingMovieOptions = trendingMovies.data.results.map((result) => {
      const hasReleaseDate = result.hasOwnProperty('release_date');
      const releaseDate =
        hasReleaseDate === true ? result.release_date.substring(0, 4) : '';
      return {
        label: (
          <Flex>
            <Center>
              {result.title} ({releaseDate})
            </Center>
            <Spacer />
            <Image
              w={9}
              fallbackSrc="https://via.placeholder.com/150"
              alt=""
              src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            />
          </Flex>
        ),
        value: result.id,
      };
    });
    return trendingMovieOptions;
  };
  return (
    <AsyncSelect
      defaultOptions={options}
      size="lg"
      isMulti
      cacheOptions
      value={props.inputValue}
      loadOptions={loadOptions}
      // onInputChange={handleChange}
      onChange={handleChange}
      noOptionsMessage={() => '⌨️ Type to start searching!'}
    />
  );
};

export default Search;
