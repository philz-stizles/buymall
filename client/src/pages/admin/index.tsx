import React from 'react';

const OverviewPage = React.lazy(() => import('./Overview/Overview'));
const SubCategoriesPage = React.lazy(
  () => import('./SubCategories/SubCategories')
);
const CategoriesPage = React.lazy(() => import('./Categories/Categories'));
const SizesPage = React.lazy(() => import('./Sizes/Sizes'));
const ColorsPage = React.lazy(() => import('./Colors/Colors'));
const AdminCustomersPage = React.lazy(() => import('./Customers/Customers'));
const AdminTransactionsPage = React.lazy(
  () => import('./Transactions/Transactions')
);
const AdminOrdersPage = React.lazy(() => import('./Orders/Orders'));
const AdminVendorsPage = React.lazy(() => import('./Vendors/Vendors'));
const AdminUsersPage = React.lazy(() => import('./Users/Users'));
const AdminProductsPage = React.lazy(() => import('./Products/Products'));

const adminRoutes = [
  {
    index: true,
    element: <OverviewPage />,
  },
  {
    path: 'categories',
    element: <CategoriesPage />,
  },
  {
    path: 'sub-categories',
    element: <SubCategoriesPage />,
  },
  {
    path: 'sizes',
    element: <SizesPage />,
  },
  {
    path: 'colors',
    element: <ColorsPage />,
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
];

export default adminRoutes;
