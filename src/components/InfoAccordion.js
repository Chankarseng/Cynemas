import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react';

const InfoAccordion = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Accordion allowMultiple={true}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Streaming Services
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To filter streaming service, just type in the streaming service that
            you want to filter. For example, you may input "Netflix" into the
            search bar to select Netflix as your filter
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Countries
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To filter country, just type in the country that you want to filter.
            For example, you may input "United States" into the search bar to
            select United States as your filter
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default InfoAccordion;
