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

export {
  RouteContext,
  RouteProvider
};

export default RouteProvider;
