import { React } from 'react';
import {
  Box,
  Container,
  Stack,
  Link,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SiGithub, SiThemoviedatabase } from 'react-icons/si';

const Footer = (props) => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      left={0}
      bottom={0}
      right={0}
      px={{ base: '4', md: '8' }}
      mt={'auto'}
    >
      <Container
        as={Stack}
        maxW="full"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={'center'}
      >
        <Text textAlign="center">
          Created by Alvin Chan @ {new Date().getFullYear()}
        </Text>
        <Stack direction={'row'} spacing={6} pr={{ base: 0, md: 28 }}>
          <Link as={RouterLink} to="/">
            Home
          </Link>
          <Link as={RouterLink} to="/about">
            About
          </Link>
          <Link as={RouterLink} to="/faq">
            FAQ
          </Link>
        </Stack>
        <Stack direction={'row'} spacing={6}>
          <Link href="https://github.com/Chankarseng/Cynemas">
            <IconButton icon={<SiGithub />} />
          </Link>
          <Link href="https://themoviedb.org" isExternal>
            <IconButton icon={<SiThemoviedatabase />} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
