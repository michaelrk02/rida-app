import {ChakraProvider} from '@chakra-ui/react';

import RouteProvider from './RouteProvider';
import UserProvider from './UserProvider';

function AppProvider(props) {
  return (
    <RouteProvider>
      <UserProvider>
        <ChakraProvider>
          {props.children}
        </ChakraProvider>
      </UserProvider>
    </RouteProvider>
  );
}

function app(el) {
  return (
    <AppProvider>
      {el}
    </AppProvider>
  );
}

export {
  AppProvider,
  app
};

export default AppProvider;
