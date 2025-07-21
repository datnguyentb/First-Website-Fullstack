import { createContext, useState, useEffect } from 'react';
import userApi from '~/api/userApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const userId = JSON.parse(storedUser)?._id;
            if (userId) {
                const fetchUser = async () => {
                    try {
                        const res = await userApi.getUserById(userId);
                        setUser(res.data.data);
                    } catch (error) {
                        console.error('Error fetching user login:', error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchUser();
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
