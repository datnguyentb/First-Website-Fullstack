import { UserCompact } from '../user';

export interface Comment {
    id: string;
    post: string;
    parentCommentId: string | null;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

//comment nhận từ server
export interface CommentResponse {
    _id: string;
    post: string;
    parentCommentId: string | null;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: UserCompact;
    likes: any[];
    likeCount: number;
    replies?: CommentResponse[];
}

export interface CreateCommentInput {
    post: string;
    parentCommentId: string | null;
    content: string;
}
