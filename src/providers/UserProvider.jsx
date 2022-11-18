import {
  createContext,
  useEffect,
  useState
} from 'react';

import {
  useLocation
} from 'react-router-dom';

const UserContext = createContext();

function UserProvider(props) {
  const location = useLocation();

  function check() {
    return localStorage.getItem('AUTH_ID') !== null;
  }

  function id() {
    return localStorage.getItem('AUTH_ID');
  }

  function token() {
    return localStorage.getItem('AUTH_TOKEN');
  }

  return (
    <UserContext.Provider value={{check, id, token}}>
      {props.children}
    </UserContext.Provider>
  );
}

export {
  UserProvider,
  UserContext
};

export default UserProvider;
