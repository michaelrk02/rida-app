import {app} from '../providers/AppProvider';

import {Navigate} from 'react-router-dom';

import ProfilePage from '../pages/admin/ProfilePage';
import PasswordPage from '../pages/admin/PasswordPage';
import PenelitiListPage from '../pages/admin/PenelitiListPage';
import PenelitiFormPage from '../pages/admin/PenelitiFormPage';
import AdminListPage from '../pages/admin/AdminListPage';
import AdminFormPage from '../pages/admin/AdminFormPage';
import LoginPage from '../pages/admin/LoginPage';

const adminRoutes = {
  path: 'admin',
  children: [
    {
      path: '',
      element: app(<Navigate to="/admin/account" />)
    },
    {
      path: 'account',
      element: app(<ProfilePage />)
    },
    {
      path: 'account/password',
      element: app(<PasswordPage />)
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
      path: 'management/list',
      element: app(<AdminListPage />)
    },
    {
      path: 'management/create',
      element: app(<AdminFormPage mode="create" />)
    },
    {
      path: 'management/update/:adminId',
      element: app(<AdminFormPage mode="update" />)
    },
    {
      path: 'login',
      element: app(<LoginPage />)
    }
  ]
};

export default adminRoutes;
