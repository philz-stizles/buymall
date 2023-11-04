import { createBrowserRouter } from 'react-router-dom';
import Home from './public/Home/Home';
import Privacy from './public/Privacy/Privacy';
import React, { Suspense } from 'react';
import RootLayout from '../components/layouts/RootLayout';
import Error from './public/Error/Error';
import Auth from './public/Auth/Auth';
import {
  authRouteLoader,
  privateRouteLoader,
  publicRouteLoader,
} from '../utils/auth';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Categories from './admin/Categories/Categories';
import SubCategories from './admin/SubCategories/SubCategories';
import OverviewPage from './admin/Overview/Overview';
import AdminUsersPage from './admin/Users/Users';
import AdminVendorsPage from './admin/Vendors/Vendors';
import {
  AdminCustomersPage,
  AdminOrdersPage,
  AdminProductsPage,
  AdminTransactionsPage,
} from './admin';
import {
  VendorCouponsPage,
  VendorProductsPage,
  VendorUsersPage,
} from './vendor';

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
      <React.Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
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
          <React.Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                Loading...
              </div>
            }
          >
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
      <React.Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
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
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'sub-categories',
        element: <SubCategories />,
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'vendors',
        element: <AdminVendorsPage />,
      },
      {
        path: 'products',
        element: <AdminProductsPage />,
      },
      {
        path: 'customers',
        element: <AdminCustomersPage />,
      },
      {
        path: 'transactions',
        element: <AdminTransactionsPage />,
      },
      {
        path: 'orders',
        element: <AdminOrdersPage />,
      },
    ],
  },
  {
    path: '/vendor',
    element: (
      <Suspense fallback={<p>Loading products ....</p>}>
        <DashboardLayout />
      </Suspense>
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
