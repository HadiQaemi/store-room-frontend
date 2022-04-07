import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilCursor,
  cilNotes,
  cilSpeedometer,
  cilBuilding,
  cilTransfer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
const _nav = [
  {
    component: CNavItem,
    name: 'داشبورد',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'کالا',
    to: '/tools',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'لیست کالا',
        to: '/tools/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'مکان',
    role: 'admin',
    to: '/place',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        role: 'admin',
        component: CNavItem,
        name: 'انبار',
        to: '/place/store-room',
      },
      {
        role: 'admin',
        component: CNavItem,
        name: 'واحدهای بانکی',
        to: '/place/bank-unit',
      },
      {
        role: 'admin',
        component: CNavItem,
        name: 'شعب',
        to: '/place/branch',
      },
      {
        role: 'admin',
        component: CNavItem,
        name: 'سایر',
        to: '/place/other',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'رسید',
    to: '/receipt',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'لیست',
        to: '/receipt/list',
      },
      {
        component: CNavItem,
        name: 'ثبت رسید',
        role: 'admin',
        to: '/receipt/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'حواله',
    to: '/transference',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'لیست',
        to: '/transference/list',
      },
      {
        component: CNavItem,
        name: 'ثبت حواله',
        to: '/transference/add',
        role: 'admin',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'مدیریت',
    to: '/management',
    role: 'admin',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'کاربران',
        to: '/management/user',
        role: 'admin',
      },
      {
        component: CNavItem,
        name: 'نقش',
        to: '/management/role',
        role: 'admin',
      },
    ],
  },
]

export default _nav
