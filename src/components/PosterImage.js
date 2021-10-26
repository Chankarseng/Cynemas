import React from 'react';
import { Image } from '@chakra-ui/react';

const PosterImage = ({ poster_path }) => {
  if (poster_path !== null) {
    return (
      <Image
        w={9}
        fallbackSrc="https://via.placeholder.com/150"
        alt="poster"
        src={`https://image.tmdb.org/t/p/w92/${poster_path}`}
      />
    );
  } else {
    return <Image w={9} fallbackSrc="https://via.placeholder.com/150" alt="" />;
  }
};

export default PosterImage;
