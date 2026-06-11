import postCommentService from '../../services/comment/postCommentService.js';
import { okResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class PostCommentController {
    async create(req, res) {
        try {
            const { content, post, parentCommentId } = req.body;
            const newComment = {
                content,
                post,
                parentComment: parentCommentId || null,
                user: req.user._id,
            };

            const createdComment = await postCommentService.createComment(newComment);
            return okResponse(res, 'Comment created successfully', createdComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            return serverErrorResponse(res);
        }
    }
}

export default new PostCommentController();
