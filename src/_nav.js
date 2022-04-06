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
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  {
    component: CNavGroup,
    name: 'کالا',
    to: '/tools',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'گروه کالا',
      //   to: '/tools/group',
      // },
      // {
      //   component: CNavItem,
      //   name: 'مدل کالا',
      //   to: '/tools/model',
      // },
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
    to: '/place',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'انبار',
        to: '/place/store-room',
      },
      {
        component: CNavItem,
        name: 'واحدهای بانکی',
        to: '/place/bank-unit',
      },
      {
        component: CNavItem,
        name: 'شعب',
        to: '/place/branch',
      },
      {
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
        to: '/receipt/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'حواله',
    to: '/transference',
    role: 'admin',
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
        role: 'admin',
        component: CNavItem,
        name: 'کاربران',
        to: '/management/user',
      },
      {
        role: 'admin',
        component: CNavItem,
        name: 'نقش',
        to: '/management/role',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
]

export default _nav
