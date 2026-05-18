import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleRoutes = ({ allowedRole }) => {
  const { user, role, authReady } = useSelector((state) => state.auth);

  if (!authReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user?.uid) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoutes;