import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Spinner from "../components/Spinner";

export default function RoleRoute({ allowedRoles, children }) {
  const auth = useContext(AuthContext);

  // If AuthContext is not available, redirect to login
  if (!auth) return <Navigate to="/" replace />;

  const { user, loading } = auth;

  // Show spinner while fetching session
  if (loading) return <Spinner />;

  // Redirect if user is not logged in
  if (!user) return <Navigate to="/" replace />;

  // Redirect if user's role is not allowed
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Authorized: render the children
  return <>{children}</>;
}
