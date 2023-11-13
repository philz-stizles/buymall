import { IoHelpCircleOutline, IoMenuOutline, IoPeopleCircleOutline } from 'react-icons/io5';
import {
  MdCategory,
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineSettings,
  MdPeopleOutline,
} from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import {  FaPeopleRoof } from 'react-icons/fa6';
import { MenuProps } from '../../ui/MenuTree/MenuTree';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { RxSize } from 'react-icons/rx';
import { IoMdColorFill } from 'react-icons/io';

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
      icon: MdCategory,
      to: '/admin/sub-categories',
    },
    {
      title: 'Size',
      icon: RxSize,
      to: '/admin/sizes',
    },
    {
      title: 'Color',
      icon: IoMdColorFill,
      to: '/admin/colors',
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
      icon: BiSolidShoppingBags,
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
      icon: FaPeopleRoof,
      to: '/admin/customers',
      children: [],
    },
    {
      title: 'Vendors',
      icon: IoPeopleCircleOutline,
      to: '/admin/vendors',
      children: [],
    },
    {
      title: 'Transactions',
      icon: GrTransaction,
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
      icon: MdPeopleOutline,
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
