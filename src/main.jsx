import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import router from "./router";
import { UserProvider } from "./context/UserContext";
import { WhiteLabelProvider } from "./context/WhiteLabelContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <WhiteLabelProvider>
        <RouterProvider router={router} />
      </WhiteLabelProvider>
    </UserProvider>
  </AuthProvider>,
);
            