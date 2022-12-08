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

export default function AdminListPage() {
  const auth = useAuth();

  const [editId, setEditId] = useState(null);
  const [populate, setPopulate] = useState(Date.now());

  const handleEdit = (e) => {
    setEditId(e.currentTarget.getAttribute('data-id'));
  };

  const handleDelete = (e) => {
    if (window.confirm('Hapus admin: ' + e.currentTarget.getAttribute('data-nama') + ' ?')) {
      axios.delete('/admin/' + e.currentTarget.getAttribute('data-id')).then(() => {
        alert('Admin berhasil dihapus');
        setPopulate(Date.now());
      });
    }
  };

  if (!auth.check()) {
    return (<Navigate to="/admin/login" />);
  }

  if (editId !== null) {
    return (<Navigate to={'/admin/management/update/' + editId} />);
  }

  return (
    <AdminDashboard>
      <Flex gap={4} direction="column">
        <Flex gap={4} direction="row" wrap="wrap" align="center">
          <Heading flex={1} size="xl">Manage Admin Fakultas</Heading>
          <Button as={RouterLink} to="/admin/management/create" colorScheme="teal">Tambah Data</Button>
        </Flex>
        <DataSource
          populate={populate}
          endpoint="/admin"
          columns={[
            {id: 'nama', title: 'Nama', sort: 'admin.nama'},
            {id: 'email', title: 'E-mail', sort: 'admin.email'},
            {id: 'fakultas_nama', title: 'Fakultas', sort: 'Fakultas.nama'}
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
