import { useState } from 'react';
import { useUserContext } from '~/contexts';
import useFetchUserProfile from '~/hooks/user/useFetchUserProfile';

export function useUserProfile(userId) {
    const { user } = useUserContext();
    const [showEditProfile, setShowEditProfile] = useState(false);

    const { userData, isCurrentUser, loading, error } = useFetchUserProfile(userId, user);

    return {
        userDisplay: userData,
        isUserLogin: isCurrentUser,
        showEditProfile,
        setShowEditProfile,
        loading,
        error,
    };
}
