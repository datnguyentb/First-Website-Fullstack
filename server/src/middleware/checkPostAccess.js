import Post from '../models/Post.js';
import {
    forbiddenResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../utils/responseHelper.js';

export const checkPostAccess = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId).populate('author');

        if (!post) {
            return notFoundResponse(res, 'Post not found');
        }

        const isOwner = post.author._id.equals(userId);

        switch (post.privacy) {
            case 'public':
                return next();

            case 'private':
                if (isOwner) return next();
                return forbiddenResponse(res, 'You do not have permission to access this post');

            case 'onlyme':
                if (isOwner) return next();
                return forbiddenResponse(res, 'This post is visible to the owner only');

            case 'friends':
                const isFriend = post.author.friends.includes(userId);
                if (isFriend || isOwner) return next();
                return forbiddenResponse(res, 'Only friends can access this post');

            default:
                return badRequestResponse(res, 'Invalid privacy setting');
        }
    } catch (err) {
        return serverErrorResponse(res, 'Failed to verify post access');
    }
};
