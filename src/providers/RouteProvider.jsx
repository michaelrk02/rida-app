import {
  createContext,
  useEffect,
  useState
} from 'react';

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

const RouteContext = createContext();

function useRouter() {
  return {
    location: useLocation(),
    navigate: useNavigate(),
    params: useParams()
  };
}

function RouteProvider(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [routeContextValue, setRouteContextValue] = useState({location, navigate, params, searchParams});

  useEffect(() => {
    setRouteContextValue({location, navigate, params, searchParams});
  }, [location, navigate, params, searchParams]);

  return (
    <RouteContext.Provider value={routeContextValue}>
      {props.children}
    </RouteContext.Provider>
  );
}

function withRouteContext(Component) {
  return props => (
    <RouteContext.Consumer>
      {routeContext => (<Component {...props} routeContext={routeContext} />)}
    </RouteContext.Consumer>
  );
}

export {
  RouteContext,
  RouteProvider,
  withRouteContext,
  useRouter
};

export default RouteProvider;
