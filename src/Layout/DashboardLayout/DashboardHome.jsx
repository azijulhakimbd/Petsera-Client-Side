import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import DashboardUser from './DashboardUser';
import DashboardLayout from './DashboardLayout';
import AccessDenied from '../../Pages/AdminDashboard/AccessDenied/AccessDenied';
import Spinner from '../../components/Spinner';


const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Spinner/>
  }

  if (role === 'user') {
    return <DashboardUser />;
  } else if (role === 'admin') {
    return <DashboardLayout />;
  }

  return <AccessDenied />;
};

export default DashboardHome;
