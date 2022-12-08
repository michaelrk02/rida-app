import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';

import UserNav from './nav/UserNav';

export default function HomeLayout(props) {
  return (
    <Flex direction="column" bg="green.50" minH="100vh">
      <UserNav />
      <Box flex="1" padding={{base: 8, lg: 24}}>
        {props.children}
      </Box>
      <Flex direction="row" wrap="wrap" p={8} bg="green.400" color="white">
        <VStack grow={1} w={{base: '100%', lg: '50%'}} align="start" spacing={4}>
          <Image src="/assets/rida/img/uns.png" />
          <Text maxW="480px">Untuk mendapatkan informasi terbaru terkait aktivitas Riset dan Inovasi UNS Anda dapat mengikuti kami melalui sosial media di bawah Ini.</Text>
        </VStack>
        <VStack grow={1} w={{base: '100%', lg: '25%'}} align="start" spacing={4}>
          <Heading size="md">Tentang Kami</Heading>
          <Text maxW="480px">Untuk info lebih lanjut kunjungi atau hubungi yang tertera di bawah ini.</Text>
        </VStack>
        <VStack grow={1} w={{base: '100%', lg: '25%'}} align="start" spacing={4}>
          <Heading size="md">Portal Informasi</Heading>
          <VStack align="start" spacing={0}>
            <Link href="https://uns.ac.id/" isExternal={true}>Laman UNS</Link>
            <Link href="https://risnov.uns.ac.id/id/" isExternal={true}>Laman RISNOV</Link>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
