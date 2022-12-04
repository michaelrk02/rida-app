import {Component} from 'react';

import {
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Icon,
  IconButton,
  Image,
  Show,
  useDisclosure
} from '@chakra-ui/react';

import {
  FaBars
} from 'react-icons/fa';

import {
  Link as RouteLink
} from 'react-router-dom';

import navigationConfig from '../../config/navigation';

import UserDrawer from './UserDrawer';

export default function UserNav() {
  const drawer = useDisclosure();

  return (
    <Flex px={{base: 4, lg: 16}} py={{base: 4, lg: 8}} bg="white" justify="space-between" align="center">
      <HStack spacing={4}>
        <Image src="/assets/rida/img/uns.png" boxSize={{base: '48px', lg: '64px'}} />
        <Heading size="lg">RIDA</Heading>
      </HStack>
      <Show above="lg">
        <HStack spacing={8}>
          {navigationConfig.user.map(nav => (
            <Button as={RouteLink} to={nav.path} variant="link">{nav.title}</Button>
          ))}
        </HStack>
      </Show>
      <Hide above="lg">
        <IconButton icon={<Icon as={FaBars} />} onClick={drawer.onOpen} />
      </Hide>
      <UserDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
    </Flex>
  );
}
