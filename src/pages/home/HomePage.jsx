import {Component} from 'react';

import {
  Container,
  Flex,
  Text
} from '@chakra-ui/react';

import UserNav from '../../components/nav/UserNav';

export default function HomePage() {
  return (
    <Flex direction="column" bg="green.50" minH="100vh">
      <UserNav />
      <Container flex="1">
        <Text>Hello world</Text>
      </Container>
    </Flex>
  );
}
