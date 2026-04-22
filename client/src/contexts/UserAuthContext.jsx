// contexts/UserAuthContext.js
import { createContext, useCallback, useMemo, useState } from 'react';

export const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        return { token, role };
    });

    const login = useCallback((newToken, newRole) => {
        setAuth({ token: newToken, role: newRole });
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', newRole);
    }, []);

    const logout = useCallback(() => {
        setAuth({ token: null, role: null });
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    }, []);

    const contextValue = useMemo(
        () => ({
            auth,
            login,
            logout,
        }),
        [auth, login, logout],
    );

    return <UserAuthContext.Provider value={contextValue}>{children}</UserAuthContext.Provider>;
}
