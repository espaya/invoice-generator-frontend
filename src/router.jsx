import { createBrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import Login from "./views/login";
import UserDashboard from "./views/users/UserDashboard";
import AdminDashboard from "./views/admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import GuestRoute from "./routes/GuestRoute";

// Centralized route config
export const ROUTE_CONFIG = {
  HOME: {
    path: "/",
    element: <Login />,
    name: "Home",
    isGuestOnly: true,
  },
  ADMIN: {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    name: "Admin Dashboard",
    isProtected: true,
    roles: ["admin"],
  },
  USER: {
    path: "/user/dashboard",
    element: <UserDashboard />,
    name: "Account",
    isProtected: true,
    roles: ["user"],
  },
  NOT_FOUND: {
    path: "*",
    element: <NotFound />,
    name: "Not Found",
  },
};

// Helper functions
export const getRoutePath = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.path : "/";
};

export const getRouteElement = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.element : <NotFound />;
};

// Create router
const router = createBrowserRouter(
  Object.values(ROUTE_CONFIG).map(({ path, element, isProtected, isGuestOnly, roles }) => ({
    path,
    element: isProtected ? (
      <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
    ) : isGuestOnly ? (
      <GuestRoute>{element}</GuestRoute>
    ) : (
      element
    ),
  }))
);

export default router;

// Export paths
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path])
);
