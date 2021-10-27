import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Input,
  Stack,
} from '@chakra-ui/react';
import SearchProviders from './SearchProviders';
import SearchCountries from './SearchCountries';

const FilterAccordion = ({
  setTitleFilter,
  setSelectedProviders,
  setSelectedCountry,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Accordion allowMultiple={true}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Filter
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack m={2} spacing={5}>
              <Input
                size="lg"
                placeholder="Filter By Title"
                onChange={({ target }) => setTitleFilter(target.value)}
              ></Input>
              <SearchProviders setSelectedProviders={setSelectedProviders} />
              <SearchCountries setSelectedCountry={setSelectedCountry} />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FilterAccordion;
