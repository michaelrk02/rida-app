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

import navigationConfig from '../../config/navigation';

class AdminDrawer extends Component {

  render() {
    return (
      <Drawer isOpen={this.props.isOpen} placement="left" onClose={this.props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Halo, Admin!</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={8}>
              {navigationConfig.admin.map(nav => (
                <>
                  {nav.type === 'separator' && <Divider />}
                  {nav.type === 'link' && <Button as={RouteLink} to={nav.path} variant="link" leftIcon={nav.icon} iconSpacing={4}>{nav.title}</Button>}
                  {nav.type === 'button' && <Button variant="link" leftIcon={nav.icon} iconSpacing={4}>{nav.title}</Button>}
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
}

export default AdminDrawer;
