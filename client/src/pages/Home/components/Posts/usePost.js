import { useEffect, useState } from 'react';

export function usePost(post, user) {
    const [userInfor, setUserInfor] = useState({
        avatar: post.author.avatar,
        firstName: post.author.firstName,
        lastName: post.author.lastName,
    });
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [burstVisible, setBurstVisible] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [settingVisible, setSettingVisible] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if (user && user._id === post.author._id) {
            setIsAuthor(true);
            setUserInfor({
                avatar: user.avatar,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [user, post.author._id]);

    useEffect(() => {
        if (user && post.likes) {
            setLiked(post.likes.some((likeUser) => likeUser._id === user._id));
        } else {
            setLiked(false);
        }
    }, [post.likes, user]);
    return {
        isAuthor,
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
