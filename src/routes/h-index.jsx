import {app} from '../providers/AppProvider';

import HomePage from '../pages/home/HomePage';

const hIndexRoutes = {
  path: 'h-index',
  element: app(<HomePage />)
};

export default hIndexRoutes;
