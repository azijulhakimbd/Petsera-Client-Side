import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import DashboardUser from "./DashboardUser";
import DashboardLayout from "./DashboardLayout";
import AccessDenied from "../../Pages/AdminDashboard/AccessDenied/AccessDenied";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading)
    <div className="p-6 max-w-md mx-auto">
      <Skeleton height={40} count={3} style={{ marginBottom: 10 }} />
    </div>;

  if (role === "user") {
    return <DashboardUser />;
  } else if (role === "admin") {
    return <DashboardLayout />;
  }

  return <AccessDenied />;
};

export default DashboardHome;
