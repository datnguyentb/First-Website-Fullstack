// contexts/UserAuthContext.js
import { createContext, useState } from 'react';

export const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        return { token, role };
    });

    const login = (newToken, newRole) => {
        setAuth({ token: newToken, role: newRole });
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', newRole);
    };

    const text = 'hello';

    const logout = () => {
        console.log('Logging out...');
        setAuth({ token: null, role: null });
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    };

    return <UserAuthContext.Provider value={{ auth, text, login, logout }}>{children}</UserAuthContext.Provider>;
}
