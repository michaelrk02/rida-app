import {app} from '../providers/AppProvider';

import ProfilePage from '../pages/admin/ProfilePage';
import LoginPage from '../pages/admin/LoginPage';

const adminRoutes = {
  path: 'admin',
  children: [
    {
      path: '',
      element: app(<ProfilePage />)
    },
    {
      path: 'login',
      element: app(<LoginPage />)
    }
  ]
};

export default adminRoutes;
