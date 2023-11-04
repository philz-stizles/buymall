import { IoHelpCircleOutline, IoMenuOutline } from 'react-icons/io5';
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineSettings,
  MdPeopleOutline,
} from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MenuProps } from '../../ui/MenuTree/MenuTree';

export const mainMenus: { [key: string]: MenuProps[] } = {
  admin: [
    {
      title: 'Overview',
      icon: MdOutlineDashboard,
      to: '/admin',
    },
    {
      title: 'Categories',
      icon: MdOutlineCategory,
      to: '/admin/categories',
    },
    {
      title: 'Sub Categories',
      icon: MdOutlineCategory,
      to: '/admin/sub-categories',
    },
  ],
  vendor: [
    {
      title: 'Overview',
      icon: MdOutlineDashboard,
      to: '/vendor',
    },
    {
      title: 'Products',
      icon: FaProductHunt,
      to: '/vendor/products',
      children: [],
    },
    {
      title: 'Coupons',
      icon: MdOutlineCategory,
      to: '/vendor/coupons',
    },
  ],
};

export const menus: { [key: string]: MenuProps[] } = {
  admin: [
    {
      title: 'Orders',
      icon: IoMenuOutline,
      to: '/admin/orders',
      children: [],
    },
    {
      title: 'Products',
      icon: FaProductHunt,
      to: '/admin/products',
    },
    {
      title: 'Customers',
      icon: MdPeopleOutline,
      to: '/admin/customers',
      children: [],
    },
    {
      title: 'Vendors',
      icon: IoMenuOutline,
      to: '/admin/vendors',
      children: [],
    },
    {
      title: 'Transactions',
      icon: IoMenuOutline,
      to: '/admin/transactions',
      children: [],
    },
  ],
  vendor: [
    {
      title: 'Orders',
      icon: IoMenuOutline,
      to: 'orders',
      children: [],
    },
    {
      title: 'Transactions',
      icon: IoMenuOutline,
      to: 'transactions',
      children: [],
    },
    {
      title: 'Invoices',
      icon: IoMenuOutline,
      to: 'invoices',
      children: [],
    },
  ],
};

export const otherMenus: { [key: string]: MenuProps[] } = {
  admin: [
    {
      title: 'Users',
      icon: MdOutlineSettings,
      to: '/admin/users',
      children: [],
    },
    {
      title: 'Help Center',
      icon: IoHelpCircleOutline,
      to: '/admin/help-center',
      children: [],
    },
    {
      title: 'Settings',
      icon: MdOutlineSettings,
      to: '/admin/settings',
      children: [],
    },
  ],
  vendor: [
    {
      title: 'Users',
      icon: MdOutlineSettings,
      to: 'users',
      children: [],
    },
    {
      title: 'Help Center',
      icon: IoHelpCircleOutline,
      to: '/help-center',
      children: [],
    },
    {
      title: 'Settings',
      icon: MdOutlineSettings,
      to: '/settings',
      children: [],
    },
  ],
};
