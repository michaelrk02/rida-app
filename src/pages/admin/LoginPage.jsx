import axios from '../../utils/axios';

import {
  Component,
  createRef
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
  VStack,
} from '@chakra-ui/react';

import AdminDashboard from '../../components/AdminDashboard';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.onLogin = this.onLogin.bind(this);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Navigate to="/admin" />);
    }

    return (
      <AdminDashboard>
        <VStack spacing={8} align="start" w="100%" maxW="lg">
          <Heading>Login</Heading>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input ref={this.emailRef} type="email" placeholder="someone@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input ref={this.passwordRef} type="password" />
          </FormControl>
          <Button onClick={this.onLogin}>Login</Button>
        </VStack>
      </AdminDashboard>
    );
  }

  onLogin() {
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    axios.post('/admin/login', {email, password}).then((response) => {
      localStorage.setItem('AUTH_ID', response.data.id);
      localStorage.setItem('AUTH_TOKEN', response.data.token);
      this.setState({isLoggedIn: true});
    });
  }

}

export default LoginPage;
