import {Component} from 'react';

import {
  Button,
  Divider,
  VStack
} from '@chakra-ui/react';

import {
  Link as RouteLink
} from 'react-router-dom';

import navigationConfig from '../../config/navigation';

class AdminNav extends Component {

  render() {
    return (
      <VStack align="start" spacing={8}>
        {navigationConfig.admin.map(nav => (
          <>
            {nav.type === 'separator' && <Divider />}
            {nav.type === 'link' && <Button as={RouteLink} to={nav.path} variant="link" leftIcon={nav.icon} iconSpacing={4}>{nav.title}</Button>}
            {nav.type === 'button' && <Button variant="link" leftIcon={nav.icon} iconSpacing={4}>{nav.title}</Button>}
          </>
        ))}
      </VStack>
    )
  }

}

export default AdminNav;
