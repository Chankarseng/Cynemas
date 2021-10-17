import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Wrap,
  WrapItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';

const Card = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageSize = useBreakpointValue({ base: 'full', md: '50%' });
  const headingSize = useBreakpointValue({
    sm: 'xl',
    md: 'md',
    lg: 'sm',
  });
  const textSize = useBreakpointValue({
    sm: '2xl',
    md: 'lg',
    lg: 'md',
  });
  const keys = Object.keys(props.watch_providers);
  const objects = Object.values(props.watch_providers);

  // { name : current.hasOwnProperty('flatrate') ?

  // current.flatrate.map((service) => {
  //   return {
  //     provider_name: service.provider_name,
  //     provider_id: service.provider_id,}})

  // :  null, }, })
  // console.log('objects', objects);
  const test = objects.reduce((prev, current) => {
    if (current.hasOwnProperty('flatrate')) {
      // const test = current.flatrate.reduce((prev, current) => {
      //   return {
      //     provider_name: current.provider_name,
      //     display_priority: current.display_priority,
      //     id: current.provider_id,
      //   };
      // }, {});

      current.flatrate.forEach((s) => {
        prev = prev.concat(s);
      });
    }
    return prev;
  }, []);
  // console.log(
  //   'TESTTTTTT',
  //   test
  //     .reduce((acc, current) => {
  //       const x = acc.find((i) => i.provider_id === current.provider_id);
  //       if (!x) {
  //         return acc.concat([current]);
  //       } else {
  //         return acc;
  //       }
  //     }, [])
  //     .sort((a, b) => {
  //       return a.display_priority - b.display_priority;
  //     })
  // );
  const testValue = test
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

  // TODO: Array has been filtered, thus now can display on the card itself
  // console.log([...new Map(test.map(item => [item.provider_id, item])).values()])
  const uniqueStreamingServices = objects.reduce((prev, current) => {
    prev = prev.concat({
      name: current.hasOwnProperty('flatrate')
        ? current.flatrate.reduce((prev, current) => {
            return prev.concat(current.provider_name);
          }, [])
        : null,
      provider_id: current.hasOwnProperty('flatrate')
        ? current.flatrate.map((s) => {
            return s.provider_id;
          })
        : null,
    });
    const providerObject = current.flatrate;
    // console.log(providerObject);
    return prev;
  }, []);
  // console.log([...new Set(uniqueStreamingServices)].filter((e) => e != null));
  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Image w={imageSize} src={props.image} />

        <Box p="3" maxW={{ base: 'full', md: '50%' }}>
          <Stack>
            <Heading fontWeight={'light'} size={headingSize}>
              Title
            </Heading>
            <Text fontSize={textSize} as="b" noOfLines={2}>
              {props.title}
            </Text>
            <Heading fontWeight={'light'} size={headingSize}>
              Released
            </Heading>
            <Text fontSize={textSize} as="b">
              {props.release_date}
            </Text>
            <Heading fontWeight={'light'} size={headingSize}>
              More at
            </Heading>
            <Text fontSize={textSize} as="b">
              <Link
                isExternal="true"
                href={`https://www.imdb.com/title/${props.external_ids.imdb_id}`}
              >
                <Button colorScheme="teal" variant="outline">
                  IMDB
                </Button>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
      <Box my={5} mx={3}>
        <Stack>
          <Heading size="sm">Streaming service available</Heading>
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
            {testValue.slice(0, 6).map((c) => {
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
          <Button colorScheme="red" variant="outline">Remove item</Button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Streaming services that {props.title} is available on
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Table size="lg" variant="simple" colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Country</Th>
                      <Th>Streaming Service Available</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {keys.map((country) => {
                      const countryStreamingService =
                        props.watch_providers[country];
                      if (countryStreamingService.hasOwnProperty('flatrate')) {
                        return (
                          <Tr key={country}>
                            <Td>
                              <Image
                                title={country}
                                alt={country}
                                src={`https://www.countryflags.io/${country}/flat/32.png`}
                              />
                              <Text>({country})</Text>
                            </Td>
                            <Td>
                              <Wrap>
                                {countryStreamingService.flatrate.map(
                                  (service) => {
                                    return (
                                      <WrapItem key={service.provider_name}>
                                        <Image
                                          title={service.provider_name}
                                          loading="lazy"
                                          alt={service.provider_name}
                                          m={2}
                                          boxSize="60px"
                                          src={`https://image.tmdb.org/t/p/w500/${service.logo_path}`}
                                        />
                                      </WrapItem>
                                    );
                                  }
                                )}
                              </Wrap>
                            </Td>
                          </Tr>
                        );
                      }
                      return null;
                    })}
                  </Tbody>
                </Table>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;
