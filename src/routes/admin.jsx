import {app} from '../providers/AppProvider';

import ProfilePage from '../pages/admin/ProfilePage';
import PenelitiListPage from '../pages/admin/PenelitiListPage';
import PenelitiFormPage from '../pages/admin/PenelitiFormPage';
import LoginPage from '../pages/admin/LoginPage';

const adminRoutes = {
  path: 'admin',
  children: [
    {
      path: 'account',
      element: app(<ProfilePage />)
    },
    {
      path: 'peneliti/list',
      element: app(<PenelitiListPage />)
    },
    {
      path: 'peneliti/create',
      element: app(<PenelitiFormPage mode="create" />)
    },
    {
      path: 'peneliti/update/:penelitiId',
      element: app(<PenelitiFormPage mode="update" />)
    },
    {
      path: 'login',
      element: app(<LoginPage />)
    }
  ]
};

export default adminRoutes;
