import {Component} from 'react';

import {
  Box,
  Flex,
  Heading,
  Hide,
  HStack,
  Icon,
  IconButton,
  Image,
  Show,
  Text
} from '@chakra-ui/react';

import {
  FaBars
} from 'react-icons/fa';

import AdminNav from './nav/AdminNav';
import AdminDrawer from './nav/AdminDrawer';

class AdminDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpened: false
    };

    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  render() {
    return (
      <Flex direction="column" bg="green.50" minH="100vh" p={{base: 4, lg: 8}}>
        <Flex direction="row" justify="space-between" align="center">
          <HStack spacing={4}>
            <Image src="/assets/rida/img/uns.png" boxSize={{base: '48px', lg: '64px'}} />
            <Heading size="lg">RIDA</Heading>
          </HStack>
          <Show above="lg">
            <Text as="b" color="gray.500">Halo, Admin!</Text>
          </Show>
          <Hide above="lg">
            <IconButton icon={<Icon as={FaBars} />} onClick={this.onDrawerOpen} />
          </Hide>
        </Flex>
        <Flex flex={1} direction="row" pt={{base: 4, lg: 8}}>
          <Show above="lg">
            <Box w="200px" mr={8}>
              <AdminNav />
            </Box>
          </Show>
          <AdminDrawer isOpen={this.state.isDrawerOpened} onClose={this.onDrawerClose} />
          <Box flex={1} bg="white" p={{base: 4, lg: 8}} borderRadius="2xl">
            {this.props.children}
          </Box>
        </Flex>
      </Flex>
    );
  }

  onDrawerOpen() {
    this.setState({isDrawerOpened: true});
  }

  onDrawerClose() {
    this.setState({isDrawerOpened: false});
  }

}

export default AdminDashboard;
