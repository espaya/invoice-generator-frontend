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
import SingleInvoice from "./views/users/Single-Invoice";
import EditInvoice from "./views/users/EditInvoice";
import AdminSettings from "./views/admin/AdminSettings";
import AdminCustomers from "./views/admin/AdminCustomers";
import AdminInvoice from "./views/admin/AdminInvoice";
import AdminUsers from "./views/admin/AdminUsers";
import AdminAddUser from "./views/admin/AdminAddUser";
import AdminSystemSettings from "./views/admin/AdminSystemSettings";
import WhiteLabel from "./views/admin/WhiteLabel";
import AdminViewUser from "./views/admin/AdminViewUser";
import AdminUserInvoice from "./views/admin/AdminUserInvoice";
import AdminUserSettings from "./views/admin/AdminUserSettings";
import AdminSingleInvoice from "./views/admin/AdminSingleInvoice";

// Centralized route config
export const ROUTE_CONFIG = {
  HOME: {
    path: "/",
    element: <Login />,
    name: "Home",
    isGuestOnly: true,
  },
  LOGIN: {
    path: "/",
    element: <Login />,
    name: "Home",
    isGuestOnly: true,
  },

  // admin routes

  ADMIN: {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    name: "Admin Dashboard",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_USERS: {
    path: "/admin/dashboard/users",
    element: <AdminUsers />,
    name: "Admin Users",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_EDIT_USERS: {
    path: "/admin/dashboard/users/edit/:id",
    element: <AdminAddUser />,
    name: "Admin Users",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_ADD_USER: {
    path: "/admin/dashboard/users/add",
    element: <AdminAddUser />,
    name: "Admin Add User",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_VIEW_USER: {
    path: "/admin/dashboard/users/:id",
    element: <AdminViewUser />,
    name: "View User",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_USER_INVOICE: {
    path: "/admin/dashboard/users/:id/invoice",
    element: <AdminUserInvoice />,
    name: "View User Invoice",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_USER_SETTINGS: {
    path: "/admin/dashboard/users/:id/settings",
    element: <AdminUserSettings />,
    name: "View User Settings",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_INVOICES: {
    path: "/admin/dashboard/invoice",
    element: <AdminInvoice />,
    name: "Admin Invoice",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_CUSTOMERS: {
    path: "/admin/dashboard/customers",
    element: <AdminCustomers />,
    name: "Admin Customers",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_SETTINGS: {
    path: "/admin/dashboard/settings",
    element: <AdminSettings />,
    name: "Admin Settings",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_SYSTEM_SETTINGS: {
    path: "/admin/dashboard/settings/system",
    element: <AdminSystemSettings />,
    name: "Admin Settings",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_SYSTEM_WHITE_LABEL: {
    path: "/admin/dashboard/settings/white-label",
    element: <WhiteLabel />,
    name: "Admin White Label",
    isProtected: true,
    roles: ["admin"],
  },

  ADMIN_SINGLE_INVOICE: {
    path: "/admin/dashboard/invoice/:invoice_number",
    element: <AdminSingleInvoice />,
    name: "View Invoice",
    isProtected: true,
    role: ["user"],
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

  EDIT_INVOICE: {
    path: "/user/dashboard/invoice/edit/:invoice_number",
    element: <EditInvoice />,
    name: "Edit Invoice",
    isProtected: true,
    roles: ["user"],
  },

  SINGLE_INVOICE: {
    path: "/user/dashboard/invoice/:invoice_number",
    element: <SingleInvoice />,
    name: "View Invoice",
    isProtected: true,
    role: ["user"],
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
  Object.values(ROUTE_CONFIG).map(
    ({ path, element, isProtected, isGuestOnly, roles }) => ({
      path,
      element: isProtected ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : isGuestOnly ? (
        <GuestRoute>{element}</GuestRoute>
      ) : (
        element
      ),
    }),
  ),
);

export default router;

// Export paths
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path]),
);
