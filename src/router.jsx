import { createBrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import Login from "./views/login";
import UserDashboard from "./views/users/UserDashboard";
import AdminDashboard from "./views/admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import GuestRoute from "./routes/GuestRoute";
import Invoice from "./views/users/Invoice";
import Customers from "./views/users/Customers";
import Settings from "./views/users/Settings";
import AddInvoice from "./views/users/AddInvoice";

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

  // user
  USER: {
    path: "/user/dashboard",
    element: <UserDashboard />,
    name: "Account",
    isProtected: true,
    roles: ["user"],
  },

    INVOICE: {
    path: "/user/dashboard/invoice",
    element: <Invoice />,
    name: "Invoice",
    isProtected: true,
    roles: ["user"],
  },

  ADD_INVOICE: {
    path: "/user/dashboard/invoice/add",
    element: <AddInvoice />,
    name: "Add Invoice",
    isProtected: true,
    roles: ["user"],
  },

  CUSTOMERS: {
    path: "/user/dashboard/customers",
    element: <Customers />,
    name: "Customers",
    isProtected: true,
    roles: ["user"],
  },

  SETTINGS: {
    path: "/user/dashboard/settings",
    element: <Settings />,
    name: "Settings",
    isProtected: true,
    roles: ["user"],
  },

  // catch-all route
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
