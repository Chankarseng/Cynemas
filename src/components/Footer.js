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
      // position={'fixed'}
      position={
        props.itemCount !== 0 && props.component.name === 'Home'
          ? 'relative'
          : 'fixed'
      }
      left={0}
      bottom={0}
      right={0}
      px={{ base: '4', md: '8' }}
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
        <Text>Created by Alvin Chan @ {new Date().getFullYear()}</Text>
        <Stack direction={'row'} spacing={6} pr={28}>
          <RouterLink to="/">
            <Link>Home</Link>
          </RouterLink>
          <RouterLink to="/about">
            <Link>About</Link>
          </RouterLink>
          <RouterLink to="/faq">
            <Link>FAQ</Link>
          </RouterLink>
        </Stack>
        <Stack direction={'row'} spacing={6}>
          <IconButton icon={<SiGithub />}></IconButton>
          <IconButton icon={<SiThemoviedatabase />}> </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
