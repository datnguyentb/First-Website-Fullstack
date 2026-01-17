export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
    isOnline: boolean;
    lastActive: string | Date | null;
    bio?: string; // Các trường bổ sung
    email?: string;
    phoneNumber?: string;
    address?: string;
    friendsCount?: number;
}

export interface UserInfo {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    phoneNumber: string;
    deleted: boolean;
}
