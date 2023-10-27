import { createBrowserRouter } from 'react-router-dom';
import Home from './public/Home/Home';
import Privacy from './public/Privacy/Privacy';
import React from 'react';
import RootLayout from '../components/layouts/RootLayout';
import Error from './public/Error/Error';
import Auth from './public/Auth/Auth';
import { privateRouteLoader, publicRouteLoader } from '../utils/auth';

// Lazy loaded routes.
const Products = React.lazy(() => import('./public/Products/Products'));
const ProductDetails = React.lazy(
  () => import('./public/ProductDetails/ProductDetails')
);
const Vendor = React.lazy(() => import('./public/Vendor/Vendor'));
const Category = React.lazy(() => import('./public/Category/Category'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    loader: privateRouteLoader,
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
        element: (
          <React.Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                Loading...
              </div>
            }
          >
            <Category />
          </React.Suspense>
        ),
      },
      {
        path: '/products',
        children: [
          {
            index: true,
            element: (
              <React.Suspense
                fallback={
                  <div className="w-full h-screen flex justify-center items-center">
                    Loading...
                  </div>
                }
              >
                <Products />
              </React.Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <React.Suspense
                fallback={
                  <div className="w-full h-screen flex justify-center items-center">
                    Loading...
                  </div>
                }
              >
                <ProductDetails />
              </React.Suspense>
            ),
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
    loader: publicRouteLoader,
  },
]);

export default routes;
