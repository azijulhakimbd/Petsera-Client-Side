import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Context/AuthContext";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  if (loading || isAdminLoading) {
    return <div className="p-10"><Skeleton height={60} count={3} /></div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/access-denied" state={{ from: location }} replace />;
};

export default AdminRoute;
