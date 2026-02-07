import { PATHS } from "../router"; // Your path constants

/**
 * Logout the user safely:
 * 1. Clear React state
 * 2. Clear local/session storage
 * 3. Call Laravel logout API (session-based)
 * 4. Redirect to login
 */
export const logoutUser = async (setUser, navigate) => {
  const apiBase = import.meta.env.VITE_API_URL;

  try {
    // 1️⃣ Clear frontend state first
    if (setUser) setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // 2️⃣ Call logout API (Laravel Sanctum session-based)
    await fetch(`${apiBase}/api/logout`, {
      method: "POST",
      credentials: "include", // ensure cookies are sent
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // 3️⃣ Redirect safely
    if (navigate) {
      navigate(PATHS.LOGIN, { replace: true });
    } else {
      window.location.replace(PATHS.LOGIN);
    }
  } catch (err) {
    console.error("Logout failed:", err);
    window.location.replace(PATHS.LOGIN);
  }
};
