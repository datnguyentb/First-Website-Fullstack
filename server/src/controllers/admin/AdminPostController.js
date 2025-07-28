import Post from '../../models/Post.js';
import Log from '../../models/Log.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';
import fs from 'fs';
import path from 'path';

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
                .populate('author', 'firstName lastName email avatarUrl')
                .sort({ createdAt: -1 });

            successRespone(res, 'Get Success!', posts);
        } catch (error) {
            errorResponse(res, 'Failed to get posts!');
        }
    };

    softDelete = async (req, res, next) => {
        try {
            const postId = req.params.id;
            const userId = req.user._id;
            const { reason } = req.body;

            const post = await Post.findOne({ _id: postId }).populate('author', 'firstName lastName email avatarUrl');

            if (!post) {
                return errorResponse(res, 'Không tìm thấy bài viết.');
            }

            post.deletedByAdmin = userId;
            post.deletedReason = reason || '';
            await post.delete();

            await Log.create({
                type: 'delete',
                target: 'Post',
                targetId: postId,
                actionBy: req.user._id,
                reason: reason || '',
            });

            return successRespone(res, 'Xóa bài viết thành công', post);
        } catch (error) {
            return errorResponse(res, 'Lỗi server.');
        }
    };

    restorePost = async (req, res, next) => {
        try {
            const postId = req.params.id;

            const post = await Post.findOneDeleted({ _id: postId }).populate(
                'author',
                'firstName lastName email avatarUrl',
            );

            if (!post) {
                return errorResponse(res, 'Không tìm thấy bài viết đã xóa.');
            }

            await post.restore();
            post.deletedByAdmin = null;
            post.deletedReason = '';
            await post.save();

            await Log.create({
                type: 'restore',
                target: 'Post',
                targetId: postId,
                actionBy: req.user._id,
            });

            return successRespone(res, 'Khôi phục bài viết thành công.', post);
        } catch (error) {
            return errorResponse(res, 'Lỗi server.');
        }
    };

    forceDeletePost = async (req, res, next) => {
        try {
            const postId = req.params.id;

            const post = await Post.findOneWithDeleted({ _id: postId });

            if (!post) {
                return errorResponse(res, 'Không tìm thấy bài viết.');
            }

            if (post.images && post.images.length > 0) {
                for (const imageUrl of post.images) {
                    const imagePath = path.join(process.cwd(), 'src', imageUrl);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            }

            await post.deleteOne();

            await Log.create({
                type: 'force-delete',
                target: 'Post',
                targetId: postId,
                actionBy: req.user._id,
            });

            return successRespone(res, 'Đã xóa vĩnh viễn bài viết.');
        } catch (error) {
            return errorResponse(res, 'Lỗi server.');
        }
    };
}

export default new AdminPostController();
