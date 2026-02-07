import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
