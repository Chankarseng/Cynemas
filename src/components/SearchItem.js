import React, { useEffect, useState } from 'react';
import { AsyncSelect } from 'chakra-react-select';
import searchService from '../services/search';
import { Center, Flex, Spacer } from '@chakra-ui/layout';
<<<<<<< Updated upstream
import { Image } from '@chakra-ui/image';
const SearchItem = (props) => {
  const [options, setOptions] = useState([]);

=======
import PosterImage from './PosterImage';
import { useBreakpointValue } from '@chakra-ui/media-query';
const SearchItem = (props) => {
  const [options, setOptions] = useState([]);
  const [movieOptions, setMovieOptions] = useState([]);
  const [tvOptions, setTvOptions] = useState([]);
  const searchBarSize = useBreakpointValue({ base: 'sm', md: 'lg' });
>>>>>>> Stashed changes
  useEffect(() => {
    const getTrending = async () => {
      let trendingItems;
      let trendingItemOptions;
      if (props.currentSearchType === 'Movies') {
        trendingItems = await searchService.getTrendingMovies();
        trendingItemOptions = trendingItems.data.results.map((result) => {
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
      } else if (props.currentSearchType === 'TV') {
        trendingItems = await searchService.getTrendingTv();
        trendingItemOptions = trendingItems.data.results.map((result) => {
          const hasFirstAirDate = result.hasOwnProperty('first_air_date');
          const firstAirDate =
            hasFirstAirDate === true
              ? result.first_air_date.substring(0, 4)
              : '';
          return {
            label: (
              <Flex>
                <Center>
                  {result.name} ({firstAirDate})
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
      }
      return trendingItemOptions;
    };
    (async () => {
      const trendingMovies = await getTrending();
      setOptions(trendingMovies);
    })();
  }, [props.currentSearchType]);

  let timeoutId;
  const loadOptions = (value, callback) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(async () => {
      callback(await filterData(value));
    }, 1000);
  };
  const filterData = async (value) => {
    if (value !== '') {
      if (props.currentSearchType === 'Movies') {
        const result = await searchService.searchMovie(value);

        const finalResult = result.data.results
          .filter((data) => {
            return data.title.toLowerCase().includes(value.toLowerCase());
          })
          .map((result) => {
            const hasReleaseDate = result.hasOwnProperty('release_date');
            const releaseDate =
              hasReleaseDate === true
                ? result.release_date.substring(0, 4)
                : '';
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
      } else if (props.currentSearchType === 'TV') {
        const result = await searchService.searchTV(value);
        const finalResult = result.data.results
          .filter((data) => {
            return data.name.toLowerCase().includes(value.toLowerCase());
          })
          .map((result) => {
            const hasAirDate = result.hasOwnProperty('first_air_date');
            const airDate =
              hasAirDate === true ? result.first_air_date.substring(0, 4) : '';
            return {
              label: (
                <Flex>
                  <Center>
                    {result.name} ({airDate})
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
    }
    return {};
  };
  const handleChange = (value) => {
    props.setInputValue(value);
  };

  return (
    <AsyncSelect
      openMenuOnFocus={true}
      placeholder={`Search ${props.currentSearchType} title`}
      defaultOptions={options}
      size={searchBarSize}
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

export default SearchItem;
