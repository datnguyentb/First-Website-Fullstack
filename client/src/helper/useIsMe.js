// useIsMe.js
import { useUserContext } from '~/contexts';

export default function useIsMe() {
    const { user } = useUserContext();

    return (userId) => {
        if (!user || !userId) return false;
        return String(user._id) === String(userId);
    };
}
