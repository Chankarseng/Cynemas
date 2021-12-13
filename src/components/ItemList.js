import React from 'react';

import { useBreakpointValue, GridItem, Box } from '@chakra-ui/react';
import Card from './Card';
const MovieList = ({
  listOfItems,
  titleFilter,
  selectedCountry,
  selectedProviders,
  handleRemove,
}) => {
  const cardColSpan = useBreakpointValue({ base: 8, md: 4, lg: 2 });
  console.log(listOfItems)
  return listOfItems != null || listOfItems.length !== 0
    ? listOfItems.map((movie) => {
        return (
          <GridItem key={movie.id} colSpan={cardColSpan}>
            <Box
              key={movie.id}
              overflow="hidden"
              borderRadius="lg"
              borderWidth="1px"
              boxShadow="dark-lg"
            >
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.poster}
                release_date={movie.release_date}
                watch_providers={movie.watch_providers}
                external_ids={movie.external_ids}
                handleRemove={handleRemove}
              />
            </Box>
          </GridItem>
        );
      })
    : null;
};
export default MovieList;
