// contexts/AdminAuthContext.js
import { createContext, ReactNode, useState } from 'react';
import { AdminAuthContextType } from './AdminAuthContextTypes';

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('adminRole');
        return { token, role };
    });

    const login = (newToken: string, newRole: string) => {
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
