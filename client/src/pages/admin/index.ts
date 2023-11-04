import React from 'react';

const AdminCustomersPage = React.lazy(() => import('./Customers/Customers'));
const AdminTransactionsPage = React.lazy(
  () => import('./Transactions/Transactions')
);
const AdminOrdersPage = React.lazy(() => import('./Orders/Orders'));
const AdminVendorsPage = React.lazy(() => import('./Vendors/Vendors'));
const AdminUsersPage = React.lazy(() => import('./Users/Users'));
const AdminProductsPage = React.lazy(() => import('./Products/Products'));

export {
  AdminCustomersPage,
  AdminTransactionsPage,
  AdminVendorsPage,
  AdminOrdersPage,
  AdminUsersPage,
  AdminProductsPage
};
