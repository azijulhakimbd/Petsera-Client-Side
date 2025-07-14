import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Context/AuthContext";
import useUserRole from "../../Hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <div className="p-10"><Skeleton height={60} count={3} /></div>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/access-denied" state={{ from: location }} replace />;
};

export default AdminRoute;
