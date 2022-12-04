import axios from '../../utils/axios';

import {
  Component,
  useRef,
  useState
} from 'react';

import {
  Navigate
} from 'react-router-dom';

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react';

import {useAuth} from '../../providers/UserProvider';

import AdminDashboard from '../../components/AdminDashboard';

export default function LoginPage() {
  const auth = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios.post('/admin/login', {email, password}).then((response) => {
      localStorage.setItem('AUTH_ID', response.data.id);
      localStorage.setItem('AUTH_ROLE', response.data.role);
      localStorage.setItem('AUTH_TOKEN', response.data.token);
      setIsLoggedIn(true);
    });
  };

  if (auth.check() || isLoggedIn) {
    return (<Navigate to="/admin/account" />);
  }

  return (
    <AdminDashboard>
      <VStack spacing={8} align="start" w="100%" maxW="lg">
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input ref={emailRef} type="email" placeholder="someone@example.com" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input ref={passwordRef} type="password" />
        </FormControl>
        <Button onClick={handleLogin}>Login</Button>
      </VStack>
    </AdminDashboard>
  );
}
