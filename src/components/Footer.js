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
import { useLocation } from 'react-router-dom';
import { SiGithub, SiThemoviedatabase } from 'react-icons/si';
import FooterLink from './FooterLink';

const Footer = (props) => {
  const location = useLocation();
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
          <FooterLink to={'/'} location={location.pathname}>
            Home
          </FooterLink>
          <FooterLink to={'/about'} location={location.pathname}>
            About
          </FooterLink>
          <FooterLink to={'/faq'} location={location.pathname}>
            FAQ
          </FooterLink>
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
