import Post from '../models/Post.js';

export const checkPostAccess = async (req, res, next) => {
    const postId = req.params.postId || req.body.postId;
    const userId = req.user._id;
    try {
        const post = await Post.findById(postId).populate('author');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isOwner = post.author._id.equals(userId);

        switch (post.privacy) {
            case 'public':
                return next();

            case 'private':
                if (isOwner) return next();
                return res.status(403).json({ message: 'You do not have access to this post.' });

            case 'onlyme':
                if (isOwner) return next();
                return res.status(403).json({ message: 'This post is private (only me).' });

            case 'friends':
                // Ví dụ: kiểm tra nếu user là bạn với author
                const isFriend = post.author.friends.includes(userId);
                if (isFriend || isOwner) return next();
                return res.status(403).json({ message: 'Only friends can access this post.' });

            default:
                return res.status(400).json({ message: 'Unknown privacy setting.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
