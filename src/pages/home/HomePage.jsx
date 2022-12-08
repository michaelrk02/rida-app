import {Component} from 'react';

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';

import {
  Link as RouterLink
} from 'react-router-dom';

import HomeLayout from '../../components/HomeLayout';

export default function HomePage() {
  return (
    <HomeLayout>
      <Flex direction="row" wrap="wrap" align="center" justify="space-between" mb={8}>
        <VStack grow={1} w={{base: '100%', lg: '50%'}} spacing={8} align="start">
          <Heading size="lg">APLIKASI RIDA</Heading>
          <Text>Riset Inovasi Dalam Angka</Text>
        </VStack>
        <Center grow={1} w={{base: '100%', lg: '50%'}} py={8}>
          <Image src="/assets/rida/img/home-intro.svg" />
        </Center>
      </Flex>
      <Flex direction="row" wrap="wrap" align="center" justify="space-between" mb={8}>
        <Center grow={1} w={{base: '100%', lg: '50%'}} py={8}>
          <Image src="/assets/rida/img/home-about.png" />
        </Center>
        <VStack grow={1} w={{base: '100%', lg: '50%'}} spacing={8} align="start">
          <Center w="100%">
            <Heading size="lg">TENTANG RIDA</Heading>
          </Center>
          <Text>Bidang Riset dan Inovasi UNS (RISNOV UNS) menyampaikan terima kasih yang sebesar-besarnya atas kegigihan kepada para inventor yang telah menghilirkan hasil risetnya dan para inovator yang telah menghasilkan produk inovasinya. RISNOV mendorong para peneliti dan inovator UNS untuk melakukan riset dan inovasi secara berkelanjutan hingga produknya dimanfaatkan masyarakat. Mari bersama-sama majukan Riset dan Inovasi UNS untuk masyarakat.</Text>
          <Box>
            <Text>Prof. Dr. Kuncoro Diharjo, S.T., M.T.</Text>
            <Text>Wakil Rektor Riset dan Inovasi</Text>
          </Box>
        </VStack>
      </Flex>
      <Flex direction="row" wrap="wrap" align="center" justify="space-between" mb={8}>
        <VStack grow={1} w={{base: '100%', lg: '50%'}} spacing={8} align="start">
          <Box>
            <Heading size="lg" maxW="320px">Digitalisasi Riset Inovasi Dalam Angka</Heading>
          </Box>
          <Text>Untuk dapat mengakses aplikasi RIDA silahkan klik tombol selengkapnya dibawah ini.</Text>
          <Center w="100%">
            <Button as={RouterLink} to="/h-index" colorScheme="teal">Selengkapnya</Button>
          </Center>
        </VStack>
        <Center grow={1} w={{base: '100%', lg: '50%'}} py={8}>
          <Image src="/assets/rida/img/home-start.svg" />
        </Center>
      </Flex>
    </HomeLayout>
  );
}
