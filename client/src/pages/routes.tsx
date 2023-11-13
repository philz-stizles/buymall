import { createBrowserRouter } from 'react-router-dom';
import Home from './public/Home/Home';
import Privacy from './public/Privacy/Privacy';
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

// Lazy loaded routes.
const Products = React.lazy(() => import('./public/Products/Products'));
const ProductDetails = React.lazy(
  () => import('./public/ProductDetails/ProductDetails')
);
const Vendor = React.lazy(() => import('./public/Vendor/Vendor'));
const Category = React.lazy(() => import('./public/Category/Category'));

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
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/category',
        element: <Category />,
      },
      {
        path: '/products',
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ':id',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: '/vendor',
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Vendor />
          </React.Suspense>
        ),
      },
    ],
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
