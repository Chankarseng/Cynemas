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
} from '@chakra-ui/react';

const ModalDisplay = ({ title, isOpen, onClose, keys, watch_providers }) => {
  if (keys.length === 0 || keys === undefined || keys === []) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
