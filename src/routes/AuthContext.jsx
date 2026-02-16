import React, { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_URL;
  const fetchedRef = useRef(false); // 🔒 guard

  const fetchUser = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    try {
      const res = await fetch(`${apiBase}/api/user`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
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
  }, [apiBase]);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
