import {
  Component,
  useEffect,
  useState
} from 'react'

import {
  Navigate
} from 'react-router-dom';

import {useAuth} from '../../providers/UserProvider';

import {
  Link as RouterLink
} from 'react-router-dom';

import axios from '../../utils/axios';

import {
  Button,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react';

import AdminDashboard from '../../components/AdminDashboard';

export default function ProfilePage() {
  const auth = useAuth();

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [fakultas, setFakultas] = useState(null);

  useEffect(() => {
    if (auth.check()) {
      axios.get('/admin/' + auth.id).then(res => {
        setNama(res.data.nama);
        setEmail(res.data.email);
        setFakultas(res.data.fakultas_nama);
      });
    }
  }, []);

  if (!auth.check()) {
    return (<Navigate to="/admin/login" />);
  }

  return (
    <AdminDashboard>
      <VStack spacing={8} align="start">
        <Heading size="2xl">Profil</Heading>
        <VStack spacing={2} align="start">
          <Text>Nama: {nama}</Text>
          <Text>E-mail: {email}</Text>
          <Text>Status: {fakultas === null ? 'Superadmin' : 'Admin Fakultas'}</Text>
        </VStack>
        {
          (fakultas !== null) &&
          <VStack spacing={2} align="start">
            <Text>Fakultas yang ditangani: {fakultas}</Text>
          </VStack>
        }
        <VStack spacing={2} align="start">
          <Button as={RouterLink} to="/admin/account/password" colorScheme="teal">Ganti Password</Button>
        </VStack>
      </VStack>
    </AdminDashboard>
  );
}
