import { createContext } from 'react';
import { Loading } from '~/components';
import useGetUserById from '~/hooks/user/useGetUserById';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, setUser, loading } = useGetUserById();

    if (loading) return <Loading />;

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
