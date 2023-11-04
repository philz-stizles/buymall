import React from 'react';

const VendorProductsPage = React.lazy(() => import('./Products/Products'));

const VendorCouponsPage = React.lazy(() => import('./Coupons/Coupons'));

const VendorUsersPage = React.lazy(() => import('./Users/Users'));

export { VendorProductsPage, VendorCouponsPage, VendorUsersPage };
