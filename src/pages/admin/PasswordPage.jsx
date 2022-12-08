import {
  useRef,
  useState
} from 'react';

import {useAuth} from '../../providers/UserProvider';

import {Navigate} from 'react-router-dom';

import axios from '../../utils/axios';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';

import AdminDashboard from '../../components/AdminDashboard';

export default function PasswordPage(props) {
  const auth = useAuth();

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const newPasswordRepeatRef = useRef(null);

  const [arePasswordsMatch, setArePasswordsMatch] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handlePasswordChange = () => {
    if (newPasswordRef.current.value !== '') {
      if (newPasswordRef.current.value !== newPasswordRepeatRef.current.value) {
        setArePasswordsMatch(false);
      } else {
        setArePasswordsMatch(true);
      }
    } else {
      setArePasswordsMatch(null);
    }
  };

  const handleSubmit = () => {
    const data = {
      old_password: oldPasswordRef.current.value,
      new_password: newPasswordRef.current.value
    };

    if (arePasswordsMatch) {
      axios.put('/admin/' + auth.id + '/password', data).then(function() {
        alert('Password telah berhasil diubah');
        setIsUpdated(true);
      });
    } else {
      alert('Password tidak cocok');
    }
  };

  if (!auth.check()) {
    return (<Navigate to="/admin/login" />);
  }

  if (isUpdated) {
    return (<Navigate to="/admin/account" />);
  }

  return (
    <AdminDashboard>
      <Flex direction="column" gap={8}>
        <Heading>Ganti Password</Heading>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Password Lama</FormLabel>
            <Input ref={oldPasswordRef} type="password" placeholder="Masukkan password lama" />
          </FormControl>
        </Flex>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Password Baru</FormLabel>
            <Input ref={newPasswordRef} onChange={handlePasswordChange} type="password" placeholder="Masukkan password baru" />
          </FormControl>
        </Flex>
        <Flex direction="row" wrap="wrap" gap={4}>
          <FormControl grow={1} w={{base: '100%', lg: '30%'}}>
            <FormLabel>Ulangi Password Baru</FormLabel>
            <Input ref={newPasswordRepeatRef} onChange={handlePasswordChange} type="password" placeholder="Ulangi password baru" isInvalid={(arePasswordsMatch !== null) && !arePasswordsMatch} />
            {(arePasswordsMatch !== null) && !arePasswordsMatch && (<Text fontSize="sm" color="red">Password tidak cocok</Text>)}
          </FormControl>
        </Flex>
        <Box>
          <Button colorScheme="teal" onClick={handleSubmit}>Update Password</Button>
        </Box>
      </Flex>
    </AdminDashboard>
  );
}
