import {
  Icon
} from '@chakra-ui/react';

import {
  FaChartBar,
  FaEye,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';

const navigationConfig = {
  user: [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/h-index',
      title: 'H-Index Peneliti'
    },
    {
      path: '/admin',
      title: 'Admin'
    }
  ],
  admin: [
    {
      type: 'separator'
    },
    {
      type: 'link',
      path: '/admin/account',
      title: 'Profile',
      icon: <Icon as={FaUser} />,
      permissions: ['admin', 'superadmin']
    },
    {
      type: 'link',
      path: '/admin/peneliti/list',
      title: 'Manage Peneliti',
      icon: <Icon as={FaChartBar} />,
      permissions: ['admin', 'superadmin']
    },
    {
      type: 'link',
      path: '/admin/management/list',
      title: 'Manage Admin',
      icon: <Icon as={FaChartBar} />,
      permissions: ['superadmin']
    },
    {
      type: 'separator',
      permissions: ['admin', 'superadmin']
    },
    {
      type: 'link',
      path: '/',
      title: 'View Site',
      icon: <Icon as={FaEye} />
    },
    {
      type: 'button',
      message: 'logout',
      title: 'Log Out',
      icon: <Icon as={FaSignOutAlt} />,
      permissions: ['admin', 'superadmin']
    }
  ]
};

export default navigationConfig;
