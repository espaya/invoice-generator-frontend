import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiBase] = import.meta.env.VITE_API_URL;

    const fetchUser = async () => {
        try {
            const res = await fetch(`${apiBase}/api/user`, {
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
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
