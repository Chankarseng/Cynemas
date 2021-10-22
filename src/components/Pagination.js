import { Button, Box, Stack, Center } from '@chakra-ui/react';
import React from 'react';

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (totalItems === 0) {
    return null;
  } else {
    return (
      <Center>
        <Stack mt={10} direction={'row'}>
          {pageNumbers.map((number) => (
            <Box key={number}>
              <Button
                bgColor={currentPage === number ? 'blue.400' : 'whiteAlpha.100'}
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            </Box>
          ))}
        </Stack>
      </Center>
    );
  }
};

export default Pagination;
