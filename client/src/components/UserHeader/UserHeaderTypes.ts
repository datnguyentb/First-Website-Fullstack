export interface UserHeaderProps {
    userInfor: {
        _id: string;
        fullName?: string;
        firstName?: string;
        lastName?: string;
        avatar: string;
    };
    createdAt: string;
    type?: 'default' | 'post';
    privacy?: 'Public' | 'Friends' | 'Only Me' | null;
    handleClickUserProfile: () => void;
}
