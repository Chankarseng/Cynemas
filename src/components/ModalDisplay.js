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
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { getFlagEmoji } from '../utils/getFlagEmoji';
import { countryLookUp } from '../utils/countryLookup';
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
                  <Table size="sm" variant="simple" colorScheme="cyan">
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
                                <Flex
                                  direction={{ base: 'column', md: 'row' }}
                                  alignItems={{ md: 'center' }}
                                >
                                  <Text fontSize={30}>
                                    {getFlagEmoji(country)}
                                  </Text>
                                  <Text
                                    ml={{ base: 0, md: 5 }}
                                    mt={{ base: 5, md: 0 }}
                                  >
                                    {countryLookUp(country)}
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
                                            boxShadow={'lg'}
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
                  <Table size="sm" variant="simple" colorScheme="cyan">
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
                                <Flex
                                  direction={{ base: 'column', md: 'row' }}
                                  alignItems={{ md: 'center' }}
                                >
                                  <Text fontSize={30}>
                                    {getFlagEmoji(country)}
                                  </Text>
                                  <Text
                                    ml={{ base: 0, md: 5 }}
                                    mt={{ base: 5, md: 0 }}
                                  >
                                    {countryLookUp(country)}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Wrap>
                                  {countryStreamingService.ads.map(
                                    (service) => {
                                      return (
                                        <WrapItem key={service.provider_name}>
                                          <Image
                                            boxShadow={'lg'}
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
                  <Table size="sm" variant="simple" colorScheme="cyan">
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
                        if (countryStreamingService.hasOwnProperty('free')) {
                          return (
                            <Tr key={country}>
                              <Td>
                                <Flex
                                  direction={{ base: 'column', md: 'row' }}
                                  alignItems={{ md: 'center' }}
                                >
                                  <Text fontSize={30}>
                                    {getFlagEmoji(country)}
                                  </Text>
                                  <Text
                                    ml={{ base: 0, md: 5 }}
                                    mt={{ base: 5, md: 0 }}
                                  >
                                    {countryLookUp(country)}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Wrap>
                                  {countryStreamingService.free.map(
                                    (service) => {
                                      return (
                                        <WrapItem key={service.provider_name}>
                                          <Image
                                            boxShadow={'lg'}
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
