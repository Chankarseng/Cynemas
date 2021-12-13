import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const FooterLink = (props) => {
  const { to, location, children } = props;
  return (
    <Link
      as={RouterLink}
      to={to}
      color={location === to ? 'teal' : 'gray.400'}
      borderBottomWidth={location === to ? 'thin' : 'gray.400'}
      borderBottomColor={location === to ? 'teal' : 'gray.400'}
      _hover={{ outline: 0 }}
      _focus={{ outline: 0 }}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
