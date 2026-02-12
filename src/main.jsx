import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import router from "./router";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </AuthProvider>,
);
