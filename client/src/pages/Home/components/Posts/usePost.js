import { useEffect, useState } from 'react';

export function usePost(post, user) {
    const [userInfor, setUserInfor] = useState({
        avatarUrl: post.authorId.avatarUrl,
        firstName: post.authorId.firstName,
        lastName: post.authorId.lastName,
    });
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [burstVisible, setBurstVisible] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [settingVisible, setSettingVisible] = useState(false);

    useEffect(() => {
        if (user && user._id === post.authorId._id) {
            setUserInfor({
                avatarUrl: user.avatarUrl,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [user, post.authorId._id]);

    useEffect(() => {
        if (user && post.likes) {
            setLiked(post.likes.some((likeUser) => likeUser._id === user._id));
        } else {
            setLiked(false);
        }
    }, [post.likes, user]);
    return {
        userInfor,
        liked,
        setLiked,
        likeCount,
        setLikeCount,
        burstVisible,
        setBurstVisible,
        showUserProfile,
        setShowUserProfile,
        settingVisible,
        setSettingVisible,
    };
}
