import React from 'react';
import { Image,  useBreakpointValue, } from '@chakra-ui/react';
const PosterImage = ({ poster_path }) => {
  const searchBarSize = useBreakpointValue({ base: '6', md: '9' });
  if (poster_path !== null) {
    return (
      <Image
        w={searchBarSize}
        fallbackSrc="https://via.placeholder.com/150"
        alt="poster"
        src={`https://image.tmdb.org/t/p/w92/${poster_path}`}
      />
    );
  } else {
    return <Image w={searchBarSize} fallbackSrc="https://via.placeholder.com/150" alt="" />;
  }
};

export default PosterImage;
