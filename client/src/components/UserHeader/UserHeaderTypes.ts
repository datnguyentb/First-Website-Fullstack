export interface UserHeaderProps {
    userInfor: {
        _id: string;
        fullName?: string;
        firstName?: string;
        lastName?: string;
        avatar: {
            url: string;
            public_id: string;
        };
    };
    createdAt: string;
    type?: 'default' | 'post';
    privacy?: 'Public' | 'Friends' | 'Only Me' | null;
    handleClickUserProfile: () => void;
}
