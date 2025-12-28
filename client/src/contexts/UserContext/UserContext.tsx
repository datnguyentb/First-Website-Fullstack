import { createContext, useEffect, useState } from 'react';
import useGetMe from '~/hooks/user/useGetMeInfor';
import { userAuthContext } from '..';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { auth } = userAuthContext();
    const { getMe } = useGetMe();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (auth?.token === null) {
            setUser(null);
            return;
        }
        async function fetchUser() {
            const result = await getMe();
            setUser(result);
        }
        fetchUser();
    }, [auth, getMe]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
