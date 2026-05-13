import { lazy } from 'react';

import Home from './Home/Home';
import Privacy from './Privacy/Privacy';
const Favorites = lazy(() => import('./Favorites/Favorites'));
const Locate = lazy(() => import('./Locate/Locate'));
const Products = lazy(() => import('./Products/Products'));
const ProductDetails = lazy(() => import('./ProductDetails/ProductDetails'));
const Shop = lazy(() => import('./Shop/Shop'));
const Category = lazy(() => import('./Category/Category'));
const Cart = lazy(() => import('./Cart/Cart'));
const Blog = lazy(() => import('./Blog/Blog'));

const publicRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/blog',
    element: <Blog />,
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
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/locate',
    element: <Locate />,
  },
  {
    path: '/products',
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: ':slug',
        element: <ProductDetails />,
      },
    ],
  },
];
export default publicRoutes;
