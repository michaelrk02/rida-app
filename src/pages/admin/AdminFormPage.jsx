import {
  Component,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  Navigate
} from 'react-router-dom';

import {useAuth} from '../../providers/UserProvider';
import {useRouter} from '../../providers/RouteProvider';

import axios from '../../utils/axios';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Input,
  Select,
  VStack
} from '@chakra-ui/react';

import AdminDashboard from '../../components/AdminDashboard';

export default function AdminFormPage(props) {
  const auth = useAuth();
  const router = useRouter();

  const [updateId, setUpdateId] = useState(null);

  const namaRef = useRef();
  const emailRef = useRef();
  const fakultasRef = useRef();
  const passwordRef = useRef();

  const [fakultasList, setFakultasList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (auth.check()) {
      axios.get('/fakultas').then(res => {
        setFakultasList(res.data.data);

        if (props.mode === 'update') {
          const id = router.params.adminId;
          setUpdateId(id);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (updateId !== null) {
      axios.get('/admin/' + updateId).then(res => {
        namaRef.current.value = res.data.nama;
        emailRef.current.value = res.data.email;
        fakultasRef.current.value = res.data.fakultas_id;
      });
    }
  }, [updateId]);

  const handleSubmit = () => {
    const data = {
      nama: namaRef.current.value,
      email: emailRef.current.value,
      fakultas_id: fakultasRef.current.value,
      password: passwordRef.current.value
    };

    const afterSubmit = () => {
      window.alert('Data berhasil disimpan');
      setIsSubmitted(true);
    };

    if (props.mode === 'create') {
      axios.post('/admin', data).then(afterSubmit);
    } else {
      axios.put('/admin/' + updateId, data).then(afterSubmit);
    }
  };

  const modeText = {
    create: 'Tambah',
    update: 'Edit'
  }[props.mode];

  if (!auth.check()) {
    return (<Navigate to="/admin/login" />);
  }

  if (isSubmitted) {
    return (<Navigate to="/admin/management/list" />);
  }

  return (
    <AdminDashboard>
      <Flex direction="column" gap={8}>
        <Heading>{modeText} Data Admin Fakultas</Heading>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Nama</FormLabel>
            <Input ref={namaRef} type="text" placeholder="Masukkan nama" />
          </FormControl>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>E-mail</FormLabel>
            <Input ref={emailRef} type="email" placeholder="Masukkan e-mail" />
          </FormControl>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Fakultas</FormLabel>
            <Select ref={fakultasRef} placeholder="Pilih fakultas">
              {fakultasList.map(fakultas => (<option value={fakultas.id}>{fakultas.nama}</option>))}
            </Select>
          </FormControl>
        </Flex>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Password Sementara</FormLabel>
            <Input ref={passwordRef} type="password" placeholder="Masukkan password sementara" />
          </FormControl>
        </Flex>
        <Box>
          <Button colorScheme="teal" onClick={handleSubmit}>{modeText} Data Admin Fakultas</Button>
        </Box>
      </Flex>
    </AdminDashboard>
  );
}
