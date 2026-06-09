export interface Comment {
    id: string;
    post: string;
    parentCommentId: string | null;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentResponse {
    _id: string;
    post: string;
    parentCommentId: string | null;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        username: string;
        avatar: string;
    };
    replies?: CommentResponse[]; // Thêm trường này để chứa các bình luận con
}

export interface CreateCommentInput {
    post: string;
    parentCommentId: string | null;
    content: string;
}
