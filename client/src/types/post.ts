import { User } from './user';

export interface Post {
    _id: string;
    author: User;
    commentCount: number;
    content: string;
    createAt: string;
    images: string[];
    likeCount: number;
    like: any;
    location: string | null;
    private: string;
    tags: User[];
    video: string[] | null;
}
