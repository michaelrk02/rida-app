import {Component} from 'react';

import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack
} from '@chakra-ui/react';

import {
  Link as RouteLink
} from 'react-router-dom';

import {useAuth} from '../../providers/UserProvider';

import navigationConfig from '../../config/navigation';

export default function AdminDrawer(props) {
  const auth = useAuth();

  const handleButtonClick = (e) => {
    if (typeof(props.onMessage) !== 'undefined') {
      props.onMessage(e.currentTarget.getAttribute('data-message'));
    }
  };

  const permissionsFilter = (nav) => (typeof(nav.permissions) === 'undefined') || auth.check(nav.permissions);

  return (
    <Drawer isOpen={props.isOpen} placement="left" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Halo, Admin!</DrawerHeader>
        <DrawerBody>
          <VStack align="start" spacing={8}>
            {navigationConfig.admin.filter(permissionsFilter).map(nav => (
              <>
                {nav.type === 'separator' && <Divider />}
                {nav.type === 'link' && <Button as={RouteLink} to={nav.path} variant="link" leftIcon={nav.icon} iconSpacing={4}>{nav.title}</Button>}
                {nav.type === 'button' && <Button variant="link" leftIcon={nav.icon} iconSpacing={4} data-message={nav.message} onClick={handleButtonClick}>{nav.title}</Button>}
              </>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Text color="gray.500" fontSize="sm">Copyright (C) RISNOV UNS</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
