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

export default function PenelitiFormPage(props) {
  const auth = useAuth();
  const router = useRouter();

  const [updateId, setUpdateId] = useState(null);

  const nidnRef = useRef();
  const namaRef = useRef();
  const jenisKelaminRef = useRef();
  const scopusAuthorIdRef = useRef();
  const gscholarAuthorIdRef = useRef();
  const fakultasRef = useRef();

  const [fakultasList, setFakultasList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (auth.check()) {
      axios.get('/admin/' + auth.id).then(adminRes => {
        axios.get('/fakultas').then(fakultasRes => {
          setFakultasList(fakultasRes.data.data.filter((fakultas) => (adminRes.data.fakultas_id === null) || (adminRes.data.fakultas_id === fakultas.id)));

          if (props.mode === 'update') {
            const id = router.params.penelitiId;
            setUpdateId(id);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (updateId !== null) {
      axios.get('/peneliti/' + updateId).then(res => {
        nidnRef.current.value = res.data.nidn;
        namaRef.current.value = res.data.nama;
        jenisKelaminRef.current.value = res.data.jenis_kelamin;
        scopusAuthorIdRef.current.value = res.data.scopus_author_id;
        gscholarAuthorIdRef.current.value = res.data.gscholar_author_id;
        fakultasRef.current.value = res.data.fakultas_id;
      });
    }
  }, [updateId]);

  const handleSubmit = () => {
    const data = {
      nidn: nidnRef.current.value,
      nama: namaRef.current.value,
      jenis_kelamin: jenisKelaminRef.current.value,
      scopus_author_id: scopusAuthorIdRef.current.value,
      gscholar_author_id: gscholarAuthorIdRef.current.value,
      fakultas_id: fakultasRef.current.value
    };

    const afterSubmit = () => {
      window.alert('Data berhasil disimpan');
      setIsSubmitted(true);
    };

    if (props.mode === 'create') {
      axios.post('/peneliti', data).then(afterSubmit);
    } else {
      axios.put('/peneliti/' + updateId, data).then(afterSubmit);
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
    return (<Navigate to="/admin/peneliti/list" />);
  }

  return (
    <AdminDashboard>
      <Flex direction="column" gap={8}>
        <Heading>{modeText} Data Peneliti</Heading>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>NIDN</FormLabel>
            <Input ref={nidnRef} type="text" placeholder="Masukkan NIDN" />
          </FormControl>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Nama</FormLabel>
            <Input ref={namaRef} type="text" placeholder="Masukkan nama" />
          </FormControl>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Jenis Kelamin</FormLabel>
            <Select ref={jenisKelaminRef} placeholder="Pilih jenis kelamin">
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </Select>
          </FormControl>
        </Flex>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Scopus Author ID</FormLabel>
            <Input ref={scopusAuthorIdRef} type="text" placeholder="Masukkan Scopus Author ID" />
          </FormControl>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Google Scholar Author ID</FormLabel>
            <Input ref={gscholarAuthorIdRef} type="text" placeholder="Masukkan Google Scholar Author ID" />
          </FormControl>
        </Flex>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Fakultas</FormLabel>
            <Select ref={fakultasRef} placeholder="Pilih fakultas">
              {fakultasList.map(fakultas => (<option value={fakultas.id}>{fakultas.nama}</option>))}
            </Select>
          </FormControl>
        </Flex>
        <Box>
          <Button colorScheme="teal" onClick={handleSubmit}>{modeText} Data Peneliti</Button>
        </Box>
      </Flex>
    </AdminDashboard>
  );
}
