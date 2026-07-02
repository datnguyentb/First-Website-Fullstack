import Comment from '../models/Comment.js';

class PostCommentRepository {
    //Create a new comment
    static async create(data) {
        const newComment = await Comment.create(data);

        return newComment.populate('user', 'firstName lastName avatar');
    }
}

export default PostCommentRepository;
