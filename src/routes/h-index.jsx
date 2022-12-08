import {app} from '../providers/AppProvider';

import HIndexPage from '../pages/h-index/HIndexPage';

const hIndexRoutes = {
  path: 'h-index',
  element: app(<HIndexPage />)
};

export default hIndexRoutes;
