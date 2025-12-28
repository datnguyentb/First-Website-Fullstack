export type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};
