import {
  createContext,
  useEffect,
  useState
} from 'react';

import {
  useLocation
} from 'react-router-dom';

const UserContext = createContext();

function useAuth() {
  const auth = {};

  auth.id = localStorage.getItem('AUTH_ID');
  auth.role = localStorage.getItem('AUTH_ROLE');
  auth.token = localStorage.getItem('AUTH_TOKEN');

  auth.check = (roles) => {
    if (auth.id === null) {
      return false;
    }

    if ((typeof(roles) !== 'undefined') && !roles.includes(auth.role)) {
      return false;
    }

    return true;
  };

  auth.logout = () => {
    auth.id = null;
    auth.role = null;
    auth.token = null;
    localStorage.removeItem('AUTH_ID');
    localStorage.removeItem('AUTH_ROLE');
    localStorage.removeItem('AUTH_TOKEN');
  };

  return auth;
}

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

function withUserContext(Component) {
  return (props) => (
    <UserContext.Consumer>
      {userContext => <Component {...props} userContext={userContext} />}
    </UserContext.Consumer>
  )
}

export {
  UserProvider,
  UserContext,
  withUserContext,
  useAuth
};

export default UserProvider;
