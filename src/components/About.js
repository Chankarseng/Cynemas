import { React } from 'react';

import { Text, Heading, Stack, Container, Link, Image } from '@chakra-ui/react';
import TMDBLogo from '../assets/TMDB.svg';
const About = () => {
  return (
    <Container maxW="container.xl" p={10}>
      <Stack spacing={5}>
        <Heading fontSize="5xl">About Cynemas</Heading>
        <Text fontSize="2xl">
          With the number of streaming services now more than the number of
          items in Mcdonald's menu, sometimes it is very overwhelming to know
          which movies are on which streaming platform.
          <br />
          <br />
          There are sites that are dedicated for tracking streaming services for
          movies like{' '}
          <Link href="https://www.justwatch.com" isExternal color="yellow.500">
            JustWatch.com
          </Link>
          . However, i find that website is really fantastic to look for popular
          or new releases on various streaming services, but if you had a list
          of movies in mind that you want to retrieve streaming services info,
          it gets really repetitive to having to trigger a new search everytime
          you want to search a new movie / tv show.
          <br />
          <br />
          Thus, Cynemas is a personal dashboard to keep track of the movies / tv
          shows that you want to watch and displays what streaming services
          those items are available on.
          <br />
          <br />
          <Link display="inline-block" isExternal href="https://themoviedb.org">
            <Image w={100} src={TMDBLogo} />
          </Link>
          <br />
          This website uses the TMDb API but is not endorsed or certified by
          TMDb.
          <br />
          <br />
        </Text>
      </Stack>
    </Container>
  );
};

export default About;
