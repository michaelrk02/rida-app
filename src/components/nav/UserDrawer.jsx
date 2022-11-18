import {Component} from 'react';

import {
  Button,
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

class UserDrawer extends Component {

  render() {
    return (
      <Drawer isOpen={this.props.isOpen} placement="left" onClose={this.props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>RIDA</DrawerHeader>
          <DrawerBody>
            <VStack spacing={8} align="start">
              {navigationConfig.user.map(nav => (
                <Button as={RouteLink} to={nav.path} variant="link">{nav.title}</Button>
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

export default UserDrawer;
