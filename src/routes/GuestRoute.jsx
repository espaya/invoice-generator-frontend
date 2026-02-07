import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Spinner from "../components/Spinner";

const GuestRoute = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth) return null; // Context not ready

  const { user, loading } = auth;

  // Show loading while fetching session
  if (loading) return <Spinner />;

  // If user is logged in, redirect based on role
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "user") return <Navigate to="/user/dashboard" replace />;
    // fallback if role is unknown
    return <Navigate to="/" replace />;
  }

  // If no user, render the page
  return <>{children}</>;
};

export default GuestRoute;
