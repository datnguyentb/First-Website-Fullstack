import Post from '../../models/Post.js';
import Friendship from '../../models/Friendship.js';

export const canAccessPost = async (postId, userId) => {
    try {
        const post = await Post.findOne({ _id: postId }).populate('author');

        if (!post) {
            return false;
        }

        const isOwner = post.author._id.equals(userId);

        if (isOwner) return true;

        switch (post.privacy) {
            case 'public':
                return true;

            case 'private':
                return false;

            case 'friends': {
                const isFriend = await Friendship.exists({
                    status: 'accepted',
                    $or: [
                        { requester: userId, recipient: post.author._id },
                        { requester: post.author._id, recipient: userId },
                    ],
                });

                if (isFriend) return true;
                return false;
            }

            default:
                return false;
        }
    } catch (err) {
        return false;
    }
};
