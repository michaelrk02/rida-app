import {
  Component,
  useState
} from 'react'

import {
  Navigate
} from 'react-router-dom';

import {useAuth} from '../../providers/UserProvider';

import axios from '../../utils/axios';

import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton
} from '@chakra-ui/react';

import {
  FaEdit,
  FaTrash
} from 'react-icons/fa';

import {
  Link as RouterLink
} from 'react-router-dom';

import AdminDashboard from '../../components/AdminDashboard';
import DataSource from '../../components/DataSource';

export default function PenelitiListPage() {
  const auth = useAuth();

  const [editId, setEditId] = useState(null);
  const [populate, setPopulate] = useState(Date.now());

  const handleEdit = (e) => {
    setEditId(e.currentTarget.getAttribute('data-id'));
  };

  const handleDelete = (e) => {
    if (window.confirm('Hapus peneliti: ' + e.currentTarget.getAttribute('data-nama') + ' ?')) {
      axios.delete('/peneliti/' + e.currentTarget.getAttribute('data-id')).then(() => {
        alert('Peneliti berhasil dihapus');
        setPopulate(Date.now());
      });
    }
  };

  if (!auth.check()) {
    return (<Navigate to="/admin/login" />);
  }

  if (editId !== null) {
    return (<Navigate to={'/admin/peneliti/update/' + editId} />);
  }

  return (
    <AdminDashboard>
      <Flex gap={4} direction="column">
        <Flex gap={4} direction="row" wrap="wrap" align="center">
          <Heading flex={1} size="xl">Manage Peneliti</Heading>
          <Button as={RouterLink} to="/admin/peneliti/create" colorScheme="teal">Tambah Data</Button>
        </Flex>
        <DataSource
          populate={populate}
          endpoint="/peneliti"
          columns={[
            {id: 'nidn', title: 'NIDN', sort: 'peneliti.nidn'},
            {id: 'nama', title: 'Nama', sort: 'peneliti.nama'},
            {id: 'jenis_kelamin', title: 'Jenis Kelamin', sort: false},
            {id: 'fakultas_nama', title: 'Fakultas', sort: 'Fakultas.nama'},
            {id: 'diciptakan_oleh_nama', title: 'Diciptakan Oleh', sort: 'DiciptakanOleh.nama'}
          ]}
          actions={(data) => (
            <HStack>
              <IconButton data-id={data.id} icon={<Icon as={FaEdit} />} colorScheme="teal" onClick={handleEdit} />
              <IconButton data-id={data.id} data-nama={data.nama} icon={<Icon as={FaTrash} />} colorScheme="red" onClick={handleDelete} />
            </HStack>
          )}
        />
      </Flex>
    </AdminDashboard>
  );
}
