import Post from '../../models/Post.js';

const likePost = async (payload) => {
    const { userId, postId } = payload;
    try {
        const post = await Post.findById(postId);
        if (!post) return notFoundResponse(res, MESSAGE_RESPONSE.POST.NOT_FOUND);

        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            post.likes.pull(userId);
            post.likeCount = Math.max(post.likeCount - 1, 0);
        } else {
            post.likes.push(userId);
            post.likeCount += 1;
        }

        await post.save();
        await post.populate('likes', '_id avatar firstName lastName');
        await post.populate('author', '_id avatar firstName lastName');

        return { post, hasLiked };
    } catch (err) {
        return null;
    }
};

export default likePost;
