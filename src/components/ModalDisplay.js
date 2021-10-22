import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Text,
  Wrap,
  WrapItem,
  ModalFooter,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Button,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';

const ModalDisplay = ({ title, isOpen, onClose, keys, watch_providers }) => {
  const modalSize = useBreakpointValue({ base: 'xs', lg: '3xl' });

  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };
  if (keys.length === 0 || keys === undefined || keys === []) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <Text>This movie is currently not on streaming services ☹</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  } else {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Streaming services that {title} is available on
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isLazy isFitted variant="enclosed" defaultIndex={0}>
              <TabList>
                <Tab>Streaming</Tab>
                <Tab>Streaming w/ Ads</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Table size="lg" variant="simple" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Country</Th>
                        <Th>Streaming Service Available</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {keys.map((country) => {
                        const countryStreamingService =
                          watch_providers[country];
                        if (
                          countryStreamingService.hasOwnProperty('flatrate')
                        ) {
                          return (
                            <Tr key={country}>
                              <Td>
                                <Flex direction={{ base: 'column', md: 'row' }}>
                                  {/* <Image
                                    width={14}
                                    title={country}
                                    alt={country}
                                    src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`}
                                  /> */}
                                  <Text fontSize={30}>
                                    {getFlagEmoji(country)}
                                  </Text>
                                  <Text
                                    ml={{ base: 0, md: 5 }}
                                    mt={{ base: 5, md: 0 }}
                                  >
                                    ({country})
                                  </Text>
                                </Flex>
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
                </TabPanel>
                <TabPanel>
                  <Table size="lg" variant="simple" colorScheme="purple">
                    <Thead>
                      <Tr>
                        <Th>Country</Th>
                        <Th>Streaming Service Available</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {keys.map((country) => {
                        const countryStreamingService =
                          watch_providers[country];
                        if (countryStreamingService.hasOwnProperty('ads')) {
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
                                  {countryStreamingService.ads.map(
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
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
};
export default ModalDisplay;
