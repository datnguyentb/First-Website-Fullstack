import Post from '../models/Post.js';
import Friendship from '../models/Friendship.js';
import {
    forbiddenResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../utils/responseHelper.js';

export const checkPostAccess = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findOne({ _id: postId }).populate('author');

        if (!post) {
            return notFoundResponse(res, 'Post not found');
        }

        const isOwner = post.author._id.equals(userId);

        if (isOwner) return next();

        switch (post.privacy) {
            case 'public':
                return next();

            case 'private':
                return forbiddenResponse(res, 'This post is visible to the owner only');

            case 'friends': {
                const isFriend = await Friendship.exists({
                    status: 'accepted',
                    $or: [
                        { requester: userId, recipient: post.author._id },
                        { requester: post.author._id, recipient: userId },
                    ],
                });

                if (isFriend) return next();
                return forbiddenResponse(res, 'Only friends can access this post');
            }

            default:
                return badRequestResponse(res, 'Invalid privacy setting');
        }
    } catch (err) {
        return serverErrorResponse(res, 'Failed to verify post access');
    }
};
