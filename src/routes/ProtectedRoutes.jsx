import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Spinner from "../components/Spinner";

/**
 * ProtectedRoute ensures:
 * 1. User is logged in (session-based)
 * 2. Optional role-based access
 * 3. Displays a spinner while auth is loading
 */
export default function ProtectedRoute({ children, roles }) {
  const auth = useContext(AuthContext);

  if (!auth) return null; // Context not ready yet

  const { user, loading } = auth;

  // Show loading spinner while fetching user session
  if (loading) return <Spinner />;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/" replace />;

  // Role check (optional)
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // or a "Not Authorized" page
  }

  // If logged in and authorized, render the protected page
  return <>{children}</>;
}
