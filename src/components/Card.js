import React, { useState, useRef } from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Wrap,
  WrapItem,
  Link,
  useDisclosure,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import CardAlertDialog from './CardAlertDialog';
import ModalDisplay from './ModalDisplay';

const Card = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageSize = useBreakpointValue({ base: 'full', md: '50%' });
  const headingSize = useBreakpointValue({
    base: 'md',
    sm: 'xl',
    md: 'md',
    lg: 'sm',
  });
  const textSize = useBreakpointValue({
    base: 'md',
    sm: 'xl',
    md: 'lg',
    lg: 'md',
  });
  const numOfSlice = useBreakpointValue({ base: 6, sm: 6 });
  const keys = Object.keys(props.watch_providers);
  const objects = Object.values(props.watch_providers);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const onAlertDialogClose = () => setIsAlertDialogOpen(false);
  const cancelRef = useRef();

  const handleRemoveClick = () => {
    setIsAlertDialogOpen(true);
    props.handleRemove(props.id);
  };
  const streamingServices = objects.reduce((prev, current) => {
    if (current.hasOwnProperty('flatrate')) {
      current.flatrate.forEach((s) => {
        prev = prev.concat(s);
      });
    }
    if (current.hasOwnProperty('ads')) {
      current.ads.forEach((s) => {
        prev = prev.concat(s);
      });
    }
    return prev;
  }, []);

  // const streamingServicesWithAds = objects.reduce((prev, current) => {
  //   if (current.hasOwnProperty('ads')) {
  //     current.ads.forEach((s) => {
  //       prev = prev.concat(s);
  //     });
  //   }
  //   return prev;
  // }, []);
  // const uniqueSortedStreamingServicesWithAds = streamingServicesWithAds
  //   .reduce((acc, current) => {
  //     const x = acc.find((i) => i.provider_name === current.provider_name);
  //     if (!x) {
  //       return acc.concat([current]);
  //     } else {
  //       return acc;
  //     }
  //   }, [])
  //   .sort((a, b) => {
  //     return a.display_priority - b.display_priority;
  //   });
  const combinedStreamingService = streamingServices
    .reduce((acc, current) => {
      const x = acc.find((i) => i.provider_name === current.provider_name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [])
    .sort((a, b) => {
      return a.display_priority - b.display_priority;
    });
  // console.log(combinedStreamingService);
  // TODO: Array has been filtered, thus now can display on the card itself
  // console.log([...new Map(test.map(item => [item.provider_id, item])).values()])
  // const uniqueStreamingServices = objects.reduce((prev, current) => {
  //   prev = prev.concat({
  //     name: current.hasOwnProperty('flatrate')
  //       ? current.flatrate.reduce((prev, current) => {
  //           return prev.concat(current.provider_name);
  //         }, [])
  //       : null,
  //     provider_id: current.hasOwnProperty('flatrate')
  //       ? current.flatrate.map((s) => {
  //           return s.provider_id;
  //         })
  //       : null,
  //   });
  //   const providerObject = current.flatrate;
  //   // console.log(providerObject);
  //   return prev;
  // }, []);
  // console.log([...new Set(uniqueStreamingServices)].filter((e) => e != null));
  return (
    <Box pb={3}>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Image loading="lazy" w={imageSize} src={props.image} />

        <Box p="3" maxW={{ base: 'full', md: '50%' }}>
          <Flex direction={{ base: 'row', md: 'column' }} mb={3}>
            <Box>
              <Heading fontWeight={'light'} size={headingSize}>
                Title
              </Heading>
              <Text fontSize={textSize} as="b" noOfLines={2}>
                {props.title}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Heading fontWeight={'light'} size={headingSize}>
                Released
              </Heading>

              <Text fontSize={textSize} as="b">
                {props.release_date}
              </Text>
            </Box>
          </Flex>
          <Heading fontWeight={'light'} size={headingSize}>
            More at
          </Heading>
          <Box mt="3">
            <Link
              mr="10px"
              isExternal="true"
              href={`https://www.imdb.com/title/${props.external_ids.imdb_id}`}
            >
              <Button size="xs" colorScheme="teal" variant="outline">
                IMDB
              </Button>
            </Link>
            <Link
              mr="10px"
              isExternal="true"
              // Change this to point to correct URL
              href={`https://www.themoviedb.org/movie/${props.id}`}
            >
              <Button size="xs" colorScheme="teal" variant="outline">
                TMDB
              </Button>
            </Link>
            <Link
              mr="20px"
              isExternal="true"
              href={`https://www.letterboxd.com/tmdb/${props.id}`}
            >
              <Button size="xs" colorScheme="teal" variant="outline">
                Letterboxd
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
      <Box mx={3} mt={{base: 0, md: 4}}>
        <Stack>
          {combinedStreamingService.length === 0 ? (
            <Text>
              {`${props.title} is currently not available for streaming, please
              check back later`}
            </Text>
          ) : (
            <Heading size="sm">Streaming service available</Heading>
          )}
          {/* {keys.slice(0, 5).map((country) => {
            const countryStreamingService = props.watch_providers[country];
            if (countryStreamingService.hasOwnProperty('flatrate')) {
              return (
                <span>
                  {country}:{' '}
                  {countryStreamingService.flatrate.map((service) => {
                    return <span>{service.provider_name}, </span>;
                  })}
                </span>
              );
            }
            return null;
          })} */}
          <Wrap w="full">
            {combinedStreamingService.slice(0, numOfSlice).map((c) => {
              return (
                <WrapItem key={c.provider_name}>
                  <Image
                    loading="lazy"
                    alt={c.provider_name}
                    m={2}
                    boxSize="60px"
                    src={`https://image.tmdb.org/t/p/w500/${c.logo_path}`}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
          <Button onClick={onOpen}>See full details</Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setIsAlertDialogOpen(true)}
          >
            Remove item
          </Button>
          <CardAlertDialog
            isAlertDialogOpen={isAlertDialogOpen}
            onAlertDialogClose={onAlertDialogClose}
            cancelRef={cancelRef}
            handleRemoveClick={handleRemoveClick}
          />

          <ModalDisplay
            title={props.title}
            isOpen={isOpen}
            onClose={onClose}
            keys={keys}
            watch_providers={props.watch_providers}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;
