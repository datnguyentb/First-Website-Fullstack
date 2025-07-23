import Post from '../../models/Post.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';

class AdminPostController {
    getPostsNumber = async (req, res, next) => {
        try {
            const totalPosts = await Post.countDocumentsWithDeleted();
            const reportedPosts = await Post.countDocuments({
                reportedBy: { $exists: true, $not: { $size: 0 } },
            });

            successRespone(res, 'Get Success!', {
                totalPosts,
                reportedPosts,
            });
        } catch {
            errorResponse(res, 'Failed To Get!');
        }
    };

    getAllPost = async (req, res, next) => {
        try {
            const posts = await Post.findWithDeleted()
                .populate('authorId', 'firstName lastName email avatarUrl')
                .sort({ createdAt: -1 });

            successRespone(res, 'Get Success!', posts);
        } catch (error) {
            errorResponse(res, 'Failed to get posts!');
        }
    };
}

export default new AdminPostController();
