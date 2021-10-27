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
  HStack,
  useToast,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import CardAlertDialog from './CardAlertDialog';
import ModalDisplay from './ModalDisplay';

const Card = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageSize = useBreakpointValue({ base: 'full', md: '50%' });
  const headingSize = useBreakpointValue({
    base: 'sm',
    sm: 'xl',
    md: 'md',
    lg: 'sm',
  });
  const textSize = useBreakpointValue({
    base: 'sm',
    sm: 'xl',
    md: 'lg',
    lg: 'md',
  });

  const [isLoading, setIsLoading] = useState(false);
  const numOfSlice = useBreakpointValue({ base: 3, sm: 8, md: 6 });
  const keys = Object.keys(props.watch_providers);
  const objects = Object.values(props.watch_providers);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const onAlertDialogClose = () => setIsAlertDialogOpen(false);
  const cancelRef = useRef();
  const toast = useToast();

  const refreshItem = async () => {
    setIsLoading(true);
    try {
      await props.refreshItem(props.id);
      toast({
        title: `${props.title} refreshed successfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: ('Some error occurred when refreshing item', error),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
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
  return (
    <Box pb={3}>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Image loading="lazy" src={props.image}  w={imageSize} alt="poster" />

        <Box p="3" maxW={{ base: 'full', md: '50%' }} mx={2}>
          <Flex direction={{ base: 'row', md: 'column' }} mb={3}>
            <Box>
              <Heading fontWeight={'light'} size={headingSize}>
                Title
              </Heading>
              <Text fontSize={textSize} as="b" noOfLines={2}>
                {props.title}
              </Text>
            </Box>
            <Spacer mx={2} />
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
              href={`https://www.themoviedb.org/${
                props.currentSearchType === 'Movies' ? 'movie' : 'tv'
              }/${props.id}`}
            >
              <Button size="xs" colorScheme="teal" variant="outline">
                TMDB
              </Button>
            </Link>
            {props.currentSearchType === 'Movies' ? (
              <Link
                mr="20px"
                isExternal="true"
                href={`https://www.letterboxd.com/tmdb/${props.id}`}
              >
                <Button size="xs" colorScheme="teal" variant="outline">
                  Letterboxd
                </Button>
              </Link>
            ) : null}
          </Box>
        </Box>
      </Flex>
      <Box mx={5} mt={{ base: 0, md: 4 }}>
        <Stack>
          {combinedStreamingService.length === 0 ? (
            <Stack>
              <Text>
                {`${props.title} is currently not available for streaming, please
              check back later`}
              </Text>
            </Stack>
          ) : (
            <Stack>
              <Heading size="sm">Streaming service available</Heading>
              <Wrap w="full">
                {combinedStreamingService.slice(0, numOfSlice).map((c) => {
                  return (
                    <WrapItem key={c.provider_name}>
                      <Image
                        loading="lazy"
                        alt={c.provider_name}
                        m={2}
                        boxSize={{base: '40px', md: '60px'}}
                        src={`https://image.tmdb.org/t/p/w154/${c.logo_path}`}
                      />
                    </WrapItem>
                  );
                })}
              </Wrap>
              <Button w="full" onClick={onOpen}>
                See full details
              </Button>
            </Stack>
          )}

          <HStack>
            <Button
              w="full"
              colorScheme="green"
              variant="outline"
              isLoading={isLoading}
              onClick={refreshItem}
            >
              Refresh
            </Button>
            <Button
              w="full"
              colorScheme="red"
              variant="outline"
              onClick={() => setIsAlertDialogOpen(true)}
            >
              Remove Item
            </Button>
          </HStack>
          <CardAlertDialog
            currentSearchType={props.currentSearchType}
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
