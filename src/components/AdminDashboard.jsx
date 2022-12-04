import {
  Component,
  useState
} from 'react';

import {
  Navigate
} from 'react-router-dom';

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
  Text,
  useDisclosure
} from '@chakra-ui/react';

import {useAuth} from '../providers/UserProvider';

import {
  FaBars
} from 'react-icons/fa';

import AdminNav from './nav/AdminNav';
import AdminDrawer from './nav/AdminDrawer';

export default function AdminDashboard(props) {
  const auth = useAuth();
  const drawer = useDisclosure();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleMessage = (message) => {
    if (message === 'logout') {
      if (window.confirm('Apakah anda yakin untuk keluar?')) {
        auth.logout();
        setIsLoggingOut(true);
      }
    }
  };

  if (isLoggingOut) {
    return (<Navigate to="/admin/login" />);
  }

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
          <IconButton icon={<Icon as={FaBars} />} onClick={drawer.onOpen} />
        </Hide>
      </Flex>
      <Flex flex={1} direction="row" pt={{base: 4, lg: 8}} gap={8}>
        <AdminDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} onMessage={handleMessage} />
        <Show above="lg" flex={1} w="25%">
          <AdminNav onMessage={handleMessage} />
        </Show>
        <Box flex={1} bg="white" w={{base: '100%', lg: '75%'}} p={{base: 4, lg: 8}} borderRadius="2xl">
          {props.children}
        </Box>
      </Flex>
    </Flex>
  );
}
