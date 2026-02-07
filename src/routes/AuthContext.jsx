import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    try {
      const res = await fetch(`${apiBase}/api/user`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data); // ✅ directly use the object returned
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
