import Post from '../models/Post.js';
import Friendship from '../models/Friendship.js';
import {
    forbiddenResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../utils/responseHelper.js';
import { canAccessPost } from './hook/canAccessPost.js';

export const checkPostAccess = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    const allowed = await canAccessPost(postId, userId);
    if (!allowed) return forbiddenResponse(res, 'You do not have access to this post');

    next();
};
