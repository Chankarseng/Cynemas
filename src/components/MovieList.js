import React from 'react';

import { useBreakpointValue, GridItem, Box } from '@chakra-ui/react';
import Card from './Card';
const MovieList = ({
  listOfMovies,
  titleFilter,
  selectedCountry,
  selectedProviders,
}) => {
  const cardColSpan = useBreakpointValue({ base: 8, md: 4, lg: 2 });
  return listOfMovies !== null || listOfMovies.length !== 0
    ? listOfMovies
        .filter((movie) => {
          return movie.title.toLowerCase().includes(titleFilter.toLowerCase());
        })
        .filter((movie) => {
          const filter1 =
            Object.keys(movie.watch_providers).length > 0
              ? Object.keys(movie.watch_providers).some((v) => {
                  if (selectedCountry.length > 0) {
                    if (movie.watch_providers[v].hasOwnProperty('flatrate')) {
                      return selectedCountry.includes(v);
                    }
                    return false;
                  }
                  // Return all
                  return true;
                })
              : selectedCountry.length > 0
              ? false
              : true;

          const filter2 =
            Object.values(movie.watch_providers).length > 0
              ? Object.values(movie.watch_providers).some((v) => {
                  // console.log(v)
                  if (selectedProviders.length > 0) {
                    if (v.hasOwnProperty('flatrate')) {
                      const allProviders = v.flatrate.reduce((acc, current) => {
                        return acc.concat(current.provider_name);
                      }, []);
                      const found = allProviders.some((a) => {
                        return selectedProviders.includes(a);
                      });

                      return found;
                    }
                    return false;
                  } else {
                    return true;
                  }
                })
              : selectedProviders.length > 0
              ? false
              : true;
          return filter1 && filter2;
        })

        // .filter((movie) => {
        // })
        //   if (selectedCountry.length > 0) {
        //     return Object.keys(movie.watch_providers).some((v) => {
        //       if (
        //         movie.watch_providers[v].hasOwnProperty('flatrate')
        //       ) {
        //         return selectedCountry.includes(v);
        //       }
        //       return false;
        //     });
        //   }
        //   if (selectedProviders.length > 0) {
        //     return Object.values(movie.watch_providers).some((v) => {
        //       if (v.hasOwnProperty('flatrate')) {
        //         const allProviders = v.flatrate.reduce(
        //           (acc, current) => {
        //             return acc.concat(current.provider_name);
        //           },
        //           []
        //         );
        //         // Implement some or every for [either or] or all items
        //         const found = allProviders.some((a) => {
        //           return selectedProviders.includes(a);
        //         });
        //         return found;
        //       }
        //       return false;

        //       // console.log(movie.watch_providers[v]);
        //     });
        //   } else {
        //     return true;
        //   }
        // })
        .map((movie) => {
          return (
            <GridItem key={movie.id} colSpan={cardColSpan}>
              <Box
                key={movie.id}
                overflow="hidden"
                borderRadius="lg"
                borderWidth="1px"
              >
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.moviePoster}
                  release_date={movie.release_date}
                  watch_providers={movie.watch_providers}
                  external_ids={movie.external_ids}
                />
              </Box>
            </GridItem>
          );
        })
    : null;
};
export default MovieList;
