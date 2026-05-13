import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import RootLayout from '../components/layouts/RootLayout';
import Error from './public/Error/Error';
import Auth from './public/Auth/Auth';
import {
  authRouteLoader,
  privateRouteLoader,
  publicRouteLoader,
} from '../utils/auth';
import DashboardLayout from '../components/layouts/DashboardLayout';
import OverviewPage from './admin/Overview/Overview';

import {
  VendorCouponsPage,
  VendorProductsPage,
  VendorUsersPage,
} from './vendor';
import { PageLoader } from '../components/ui';
import adminRoutes from './admin';
import publicRoutes from './public';


const routes = createBrowserRouter([
  {
    id: 'public',
    path: '/',
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <RootLayout />
      </React.Suspense>
    ),
    errorElement: <Error />,
    loader: publicRouteLoader,
    children: publicRoutes,
  },
  {
    path: '/signup',
    element: <Auth />,
    loader: authRouteLoader,
  },
  {
    path: '/admin',
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <DashboardLayout />
      </React.Suspense>
    ),
    loader: privateRouteLoader,
    children: adminRoutes,
  },
  {
    path: '/vendor',
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <DashboardLayout />
      </React.Suspense>
    ),
    loader: privateRouteLoader,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },

      {
        path: 'products',
        element: <VendorProductsPage />,
      },
      {
        path: 'coupons',
        element: <VendorCouponsPage />,
      },
      {
        path: 'users',
        element: <VendorUsersPage />,
      },
    ],
  },
]);

export default routes;
