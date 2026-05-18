import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/loader/Loader";

const ProtectedRoutes = () => {
  const { user, authReady } = useSelector((state) => state.auth);

  if (!authReady) {
    return (
      <Loader/>
    );
  }

  if (!user?.uid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;