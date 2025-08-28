// contexts/AdminAuthContext.js
import { createContext, useState } from 'react';

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('adminRole');
        return { token, role };
    });

    const login = (newToken, newRole) => {
        setAuth({ token: newToken, role: newRole });
        localStorage.setItem('adminToken', newToken);
        localStorage.setItem('role', newRole);
    };

    const logout = () => {
        setAuth({ token: null, role: null });
        localStorage.removeItem('adminToken');
        localStorage.removeItem('role');
    };

    return <AdminAuthContext.Provider value={{ auth, login, logout }}>{children}</AdminAuthContext.Provider>;
}
