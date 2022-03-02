/* eslint-disable */
import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
// import AccountView from 'src/views/account/AccountView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import LabTabs from 'src/views/customer/CustomerListView/Tabs';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // { path: 'account', element: <AccountView /> },
      { path: 'adm/management', element: <LabTabs /> },
      { path: 'login', element: <LoginView/> },
      { path: 'register', element: <RegisterView /> },
      { path: '/', element: <ProductListView /> },
      { path: '*', element: <NotFoundView /> }
    ]
  },
];

export default routes;
