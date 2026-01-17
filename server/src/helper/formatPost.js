import { formatSimpleUser } from './formatUser.js';

// 1. Định nghĩa khuôn mẫu (Interface)
// export interface IPost {
//     _id: string;
//     content: string;
//     author: any; // Có thể định nghĩa chi tiết hơn là IUser
//     images: string[];
//     video?: string;
//     commentCount: number;
//     likeCount: number;
//     likes: string[];
//     privacy: string;
//     tags: string[];
//     location?: string;
//     createdAt: string;
// }

// 2. Hàm Format viết lại
export const formatPost = (post) => {
    if (!post) return null;

    const p = post.toObject ? post.toObject() : post;
    const authorFomated = formatSimpleUser(p.author);

    return {
        _id: p._id?.toString(),
        content: p.content || '',
        author: authorFomated || null,
        images: p.images || [],
        video: p.video || null,
        commentCount: p.commentCount || 0,
        likeCount: p.likeCount || 0,
        likes: p.likes || [],
        privacy: p.privacy || null,
        tags: p.tags || [],
        location: p.location || null,
        createdAt: p.createdAt,
    };
};

// Hàm format nhiều Posts
export const formatPosts = (posts) => {
    if (!posts || !Array.isArray(posts)) return [];

    return posts.map((post) => formatPost(post));
};
