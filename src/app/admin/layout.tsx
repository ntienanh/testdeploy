import AdminLayout from '@/components/layouts/AdminLayout';
import Navbar from '@/components/sections/Navbar';
import type React from 'react';

const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props || {};

  return <AdminLayout navbar={<Navbar />}>{children}</AdminLayout>;
};

export default Layout;
