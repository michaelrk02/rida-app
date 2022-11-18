import {app} from '../providers/AppProvider';

import HomePage from '../pages/home/HomePage';

const homeRoutes = {
  path: '/',
  element: app(<HomePage />)
};

export default homeRoutes;
