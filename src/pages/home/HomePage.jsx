import {Component} from 'react';

import {
  Container,
  Flex,
  Text
} from '@chakra-ui/react';

import UserNav from '../../components/nav/UserNav';

class HomePage extends Component {

  render() {
    return (
      <Flex direction="column" bg="green.50" minH="100vh">
        <UserNav />
        <Container flex="1">
          <Text>Hello world</Text>
        </Container>
      </Flex>
    );
  }

}

export default HomePage;
